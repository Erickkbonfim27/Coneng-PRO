import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import styles from './ServDetails.module.css'
import useFlashMessage from '../../../hooks/useFlashMessage'
import Caroussel from '../../carrossel/Carroussel'
import Card from '../../card/card'


function ServiceDetails() {
    const [service, setService] = useState({})
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get(`/serv/${id}`).then((response) => {
            setService(response.data.service)
        })
    }, [id])

    async function schedule() {
        let msgType = 'success'
        const data = await api.patch(`/serv/schedule/${service._id}`, null, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        })
        .then((response) => {
            console.log(response.data)
            return response.data
        })
        .catch((err) => {
            console.log(err)
            msgType = 'error'
            return err.response.data
        })
        setFlashMessage(data.message, msgType)
    }
     
    return (
        <>
            {service.title && (
                <section className={styles.serv_details_container}>
                    <div className={styles.servdetails_container }>
                        <h1>  Conheça o serviço: {service.title}  </h1>
                        <p> Mande uma mensagem para realizar uma cotação <br /></p>
                    </div>

                   <div className={styles.flexContainer}>

                        <div className={styles.serv_images} >
                            <Caroussel>
                                {service.images && service.images.map((image, index) => {
                                    return (
                                        <img
                                        key={index}
                                        src={`${process.env.REACT_APP_API}/images/serv/${image}`}
                                        alt={ service.title }
                                    />
                                )})}
                            </Caroussel>
                        </div>

                        <div className={styles.userdata}>
                            <h2>Informações do usuário</h2>
                            <p className={styles.descriptionHeader}>Descrição</p>
                            <div className={styles.description}>
                               <p>
                                        {service.Description }    
                                </p>
                            </div>
                            
                            <p>
                                <span className={ styles.bold }>
                                    <span className={styles.itemIdentifier}>Tempo de experiencia:</span> { service.TempoExperiencia }
                                </span>
                            </p>
                            <p>
                                <span className={styles.bold}>
                                    <span className={styles.itemIdentifier}>Possuí ferramentas próprias: </span> {service.PossuiFerramentasProprias}
                                </span>
                            </p>
                            <p>
                                <span className={styles.bold}>
                                    <span className={styles.itemIdentifier}>Local de trabalho: </span> {service.LocalDeTrabalho}
                                </span>
                            </p>

                            <div className={styles.botao}>
                                {token ? (
                                    <button onClick={schedule}>Solicite um orçamento</button>
                                ) : (
                                        <p>
                                            Você precisa <Link to="/register"> Criar uma conta </Link> ou

                                            <Link to="/login">
                                                Fazer Login
                                            </Link>
                                                Para solicitar um orçamento.
                                        </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.userWorks}>
                    

                    </div>
                    <div className={styles.feedbacks}>
                        <div className={ styles.experiencia }>
                                {service.experiencia && service.experiencia.map((exp, index) => (
                                    <div key={index} className={styles.experienciaItem}>
                                        <Card 
                                            title={exp.title}
                                            respeito={exp.respeito}
                                            ponntualidade={exp.pontuaidade}
                                            avaliation={exp.Avaliation}
                                            usuoepi={exp.epi}
                                            ranking={exp.ranking}
                                            nivel={exp.level}
                                            grauSatisfacoo={exp.GrauSatisfacao} 
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    )

}
export default ServiceDetails