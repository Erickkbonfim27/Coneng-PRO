import styles from '../pages/Service/addService.modules.css'

function TitleText({ title, text }) {
    return (
        <div className={ styles.addservice_header }>
            <h1>
                {title}
            </h1>
            <p>
               {text}
            </p>
        </div>
    )
}
export default TitleText