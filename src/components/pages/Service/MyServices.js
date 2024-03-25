import api from '../../../utils/api'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Dashboard.module.css'

import RoundedImage from '../../layout/RoudedImage'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function MyService() {
  const [service, setService] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api
      .get('/serv/myserv', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
         setService(response.data.service)
      })
  }, [token])

  async function removeServ(id) {
    let msgType = 'success'

    const data = await api
      .delete(`/serv/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedServ = service.filter((pet) => service._id !== id)
        setService(updatedServ)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)
  }

  async function concludeAdoption(id) {
    let msgType = 'success'

    const data = await api
      .patch(`/serv/concluiservico/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
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
    <section>
      <div className={styles.petslist_header}>
        <h1>Meus Serviços Cadastrados</h1>
        <Link to="/serv/add">Cadastrar um serviço</Link>
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
              <span className="bold">{service.name}</span>
              <div className={styles.actions}>
                {service.avaliable ? ( //aqui pode estar com o problema
                  <>
                    {service.adopter && (
                      <button
                        className={styles.conclude_btn}
                        onClick={() => {
                          concludeAdoption(service._id)
                        }}
                      >
                        Concluir serviço
                      </button>
                    )}

                    <Link to={`/serv/edit/${service._id}`}>Editar</Link>
                    <button
                      onClick={() => {
                        removeServ(service._id)
                      }}
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <p>Serviço já concluido</p>
                )}
              </div>
            </div>
          ))}
        {service.length === 0 && <p>Ainda não há serviços cadastrados</p>}
      </div>
    </section>
  )
}

export default MyService