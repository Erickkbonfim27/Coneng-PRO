import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './addService.modules.css'
import Serviceform from '../../form/ServForm'
import useFlashMessage from '../../../hooks/useFlashMessage'

function ServForm() {
  const [service, setService] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api
      .get(`/serv/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setService(response.data.service)
      })
  }, [token, id])

  async function updateServ(service) {
    let msgType = 'success'

    const formData = new FormData()

      const servFormData = await Object.keys(service).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < service[key].length; i++) {
          formData.append(`images`, service[key][i])
        }
      } else {
        formData.append(key, service[key])
      }
    })

    formData.append('serivce', servFormData)

    const data = await api
      .patch(`/serv/${service._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
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
    <section>
      <div className={styles.addpet_header}>
        <h1>Editando o Serviço: {service.title}</h1>
        <p>Depois da edição os dados serão atualizados no sistema</p>
      </div>
      {service.name && (
        <Serviceform handleSubmit={updateServ} servData={service} btnText="Editar" />
      )}
    </section>
  )
}

export default ServForm