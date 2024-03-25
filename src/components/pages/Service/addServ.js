import api from '../../../utils/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './addService.modules.css'
import ServiceForm from '../../form/ServForm' 
import TitleText from '../../form/titleText'
import useFlashMessage from '../../../hooks/useFlashMessage'

function AddService() {
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    async function registerService(service) {
        let msgType = 'success'

        const formData = new FormData()

        for (const key in service) {
            if (key === 'images') {
                for (let i = 0; i < service[key].length; i++) {
                    formData.append(`images`, service[key][i])
                }
            } else {
                formData.append(key, service[key])
            }
        }

        formData.append('service', formData)

        const data = await api
            .post(`/serv/create`, formData, {
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
                msgType = 'error'
                return err.response.data
            })

        setFlashMessage(data.message, msgType)
        navigate('/') 
    }

    return (
        <section>
            <div className={styles.addservice_header}> 
                <TitleText
                    title= "Cadastre um Servi&ccedil;o"
                    text="Depois ele ficar&aacute; dispon&iacute;vel para receber propostas"
                />
            </div>
            <ServiceForm handleSubmit={registerService} btnText="Cadastrar" />
        </section>
    )
}

export default AddService