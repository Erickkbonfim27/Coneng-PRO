import api from '../../utils/api';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Home.module.css';

function Home() {
    const [service, setService] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        api.get('/serv').then((response) => {
            setService(response.data.service); // Correção aqui: response.data.service em vez de response.data.services
        });
    }, []);

const searchLowerCase = search.toLowerCase()
const servico = service.filter(item => item.title.toLowerCase().includes(searchLowerCase))


    return (
        <section>
            <div className={styles.pet_home_header}>
                <div>
                    <h1>Contrate um Profissional</h1>
                    <p>Veja os detalhes de cada prestador e serviço</p> 
                </div>
               

               <div className="servSearchHeader">
                    <div className={styles.searchControll}>
                        <input 
                            className={styles.searchBox}
                            type="search" 
                            name='searchbox'
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)}  
                            placeholder='pesquisar...'
                        />
                         <label htmlFor="searchbox">
                            <i class="bi bi-search"></i>
                        </label>
                        
                    </div>
                </div>

            </div>
            <div className={styles.pet_container}>
                {service.length > 0 ? (
                    servico.map((item) => (
                        <div className={styles.pet_card} key={item._id}>
                            <div
                                style={{
                                    backgroundImage: `url(${process.env.REACT_APP_API}/images/serv/${item.images[0]})`,
                                }}
                                className={styles.pet_card_image}
                            ></div>
                            <h3>{item.title}</h3> {/* Alteração aqui: mudança de service.name para item.title */}
                            <p>
                                <span className="bold">Descrição:</span> {item.Description.length > 60 ? item.Description.slice(0,60) + '...' : item.Description}
                            </p>
                            {item.avaliable ? (
                                <Link to={`/serv/${item._id}`}>Mais detalhes</Link>
                            ) : (
                                <p className={styles.adopted_text}>Indisponível!</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Não há profissionais disponíveis ou cadastrados no momento</p>
                )}
            </div>
        </section>
    );
}

export default Home;
