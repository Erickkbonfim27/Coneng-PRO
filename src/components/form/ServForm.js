import { useState } from 'react'
import formStyles from './Form.module.css'
import Input from './Input'
import Select from './Select'
import CheckBox from './checkbox'

function ServForm({ handleSubmit, servData, btnText }) {
  const [service, setService] = useState(servData || {})
  const [preview, setPreview] = useState([])
  const categoria = [
    'Pedreiro',
    'Eletricista',
    'Engenheiro Civil',
    'Arquiteto',
    'Encanador',
    'Carpinteiro',
    'Pintor',
    'Mestre de Obras',
    'Topógrafo',
    'Operador de Máquinas Pesadas',
    'Técnico em Edificações',
    'Mestre de Obras',
    'Armador',
    'Caldeireiro',
    'Instalador de Drywall',
    'Marceneiro',
    'Vidraceiro',
    'Montador de Andaimes',
    'Serralheiro',
    'Estucador',
    'Encarregado de Obras',
    'Fundações e Estruturas',
    'Operador de Retroescavadeira',
    'Pedreiro de Acabamento',
    'Pedreiro de Alvenaria Estrutural',
    'Pedreiro de Revestimento',
    'Técnico em Segurança do Trabalho',
    'Torneiro Mecânico',
    'Soldador',
    'Telhadista',
    'Operador de Guindaste',
    'Apontador de Obras',
    'Operador de Betoneira',
    'Geotécnico',
    'Engenheiro de Segurança do Trabalho',
    'Fiscal de Obras'
    ]
    const experiencia = [
        'Menos de um ano', 'Um ano', 'Um ano e meio', 'Dois anos',
        'Dois anos e meio', 'Tres anos', 'Mais de três anos'
    ]
    const localDeTrabalho = [
        'Brusque', 'Guabiruba', 'Litoral', 'Brusque e Guabiruba',
        'Gaspar', 'Itajaí', 'Blumenau', 'Nova Trento', 'Botuverá'
    ];


  function onFileChange(e) {
    console.log(Array.from(e.target.files))
    setPreview(Array.from(e.target.files))
    setService({ ...service, images: [...e.target.files] })
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value })
  }

  function handleExperience(e) {
    setService({
      ...service,
      TempoExperiencia: e.target.options[e.target.selectedIndex].text,
    })
   }
    function handlePlace(e) {
        setService({
            ...service,
            LocalDeTrabalho: e.target.options[e.target.selectedIndex].text,
        })
    }
    function handleCategory(e) {
        setService({
            ...service,
            Categoria: e.target.options[e.target.selectedIndex].text
        })
    }

  const submit = (e) => {
    e.preventDefault()
    handleSubmit(service)
  }

  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      <div className={formStyles.preview_pet_images}>
        {preview.length > 0
          ? preview.map((image, index) => (
              <img
                src={URL.createObjectURL(image)}
                alt={service.name}
                key={`${service.name}+${index}`}
              />
            ))
          : service.images &&
            service.images.map((image, index) => (
              <img
                src={`${process.env.REACT_APP_API}/images/serv/${image}`}
                alt={service.name}
                key={`${service.name}+${index}`}
              />
            ))}
      </div>
      <Input
            text="Imagens de capa do serviço"
            type="file"
            name="images"
            handleOnChange={onFileChange}
            multiple={true}
      />
      <Input
            text="Título do servíço"
            type="text"
            name="title"
            placeholder="Digite o nome"
            handleOnChange={handleChange}
            value={service.title || ''}
      />
      <Input
            text="Descrição do serviço"
            type="text"
            name="Description"
            placeholder="Digite o peso aproximado"
            value={service.Description || ''}
            handleOnChange={handleChange}
       />
       <Select
            name="TempoExperiencia"
            text="Selecione o tempo de experiencia"
            options={experiencia}
            handleOnChange={handleExperience}
            value={service.TempoExperiencia || ''}
          />
          <div className={formStyles.checkboxStyle }>
            <CheckBox
                text="Possuí ferramentas próprias?"
                name="PossuiFerramentasProprias"
                checked={service.PossuiFerramentasProprias || false}
                handleOnChange={handleChange}
            />
          </div>
        <Select
            name="LocalDeTrabalho"
            text="Selecione o local de trabalho"
            options={localDeTrabalho}
            handleOnChange={handlePlace}
            value={service.LocalDeTrabalho || ''}
        />
      <Select
            name="Categoria"
            text="Selecione a categoria"
            options={categoria}
            handleOnChange={handleCategory}
            value={service.Categoria || ''}
      />
      <input type="submit" value={btnText} />
    </form>
  )
}

export default ServForm