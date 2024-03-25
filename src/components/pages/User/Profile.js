import api from '../../../utils/api'
import Input from '../../form/Input'
import { useState, useEffect } from 'react'
import styles from './Profile.module.css'
import formStyles from '../../form/Form.module.css'
import Select from '../../form/Select';

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'
import RoundedImage from '../../layout/RoudedImage'

function Profile() {
  const [user, setUser] = useState({})
  const [preview, setPreview] = useState()
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api
      .get('/users/checkuser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data)
      })
  }, [token])

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function onFileChange(e) {
    setPreview(e.target.files[0])
    setUser({ ...user, [e.target.name]: e.target.files[0] })
    }

    const gender = [
        'Homem',
        'Mulher',
        'Outros'
    ]
    function handleGender(e) { 
        setUser({
            ...user,
            Gender: e.target.options[e.target.selectedIndex].text,
        })
    }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let msgType = 'success'

    const formData = new FormData()

    const userFormData = await Object.keys(user).forEach((key) =>
        formData.append(key, user[key]),
        console.log(formData)
    )

    formData.append('user', userFormData)

    const data = await api
      .patch(`/users/edit/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
          },
      })
        .then((response) => {
            console.log('response data: '+response.data)
            console.log('User:'+user)
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
      <div className={styles.profile_header}>
        <h1>Perfil</h1>
        {(user.imagem || preview) && (
          <RoundedImage
            src={
              preview
                ? URL.createObjectURL(preview)
                : `${process.env.REACT_APP_API}/images/users/${user.imagem}`
            }
            alt={user.name}
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className={formStyles.form_container}>
        <Input
          text="Imagem"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o e-mail"
          handleOnChange={handleChange}
          value={user.email || ''}
        />
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o nome"
          handleOnChange={handleChange}
          value={user.name || ''}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={handleChange}
          value={user.phone || ''}
        />
        <Select
            name="Gender"
            text="Selecione o genero"
            options={gender}
            handleOnChange={handleGender}
            value={user.gender || ''}
        />
        <Input
            text="CPF"
            type="text"
            name="cpf"
            placeholder="Digite o seu CPF"
            handleOnChange={handleChange}
            value={user.cpf || ''}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirmação de senha"
          type="password"
          name="confirmPassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Editar" />
      </form>
    </section>
  )
}

export default Profile