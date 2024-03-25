import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import styles from './Dashboard.module.css'
import RoundedImage from '../../layout/RoudedImage'

function MeusProfissionais() {
  const [service, setService] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    api
      .get('/serv/mycontratantes', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setService(response.data.service)
      })
  }, [token])

  const handleChat = async () => {
      api.get('/serv/scheduleData', {
        headers:{
          Authorization:{
            Authorization: `Bearer ${JSON.parse(token)}`,
          }
        }
      })

    }
  


  return (
    <section>
      <div className={styles.petslist_header}>
        <h1>Meus Profissionais</h1>
      </div>
      <div className={styles.petslist_container}>
        {service.length > 0 &&
          service.map((service) => (
            <div key={service._id} className={styles.petlist_row}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/serv/${service.images[0]}`}
                alt={service.name}
                width="px75"
              />
              <span className="bold">{service.title}</span>
              <div className={styles.contacts}>
                <p>
                  <span className="bold">Ligue para:</span> {service.userOwner.phone}
                </p>
                <p>
                  <span className="bold">Fale com:</span> {service.userOwner.name}
                </p>
              </div>
              <div className={styles.actions}>
               
                  <button onClick={handleChat}> Iniciar Chat </button>
               
              </div>
            </div>
          ))}
        {service.length === 0 && <p>Ainda não há Profissionais Contratados </p>}
      </div>
    </section>
  )
}
export default MeusProfissionais