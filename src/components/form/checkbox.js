import styles from './Checkbox.modules.css'

function CheckBox({
    text,
    name,
    handleOnChange,
    Checked,
}) {
    return (
        <div className={styles.CheckBox_input }>
            <label htmlFor={name} className={styles.labelCheckbox }>
                {text }
            </label>
            <input
                type="checkbox"
                name={name}
                id={name}
                checked={Checked}
                onChange={handleOnChange }
            />
        </div>
    )
}

export default CheckBox