import clsx from 'clsx'
import styles from './Field.module.scss'

const Field = ({ name, type, placeholder, value, onInput }) => {
	return (
		<input
			name={name}
			type={type}
			placeholder={placeholder}
			value={value}
			onInput={onInput}
			className={clsx(styles.field, {
				[styles.small]: name === 'expiration-date' || name === 'cvc'
			})}
		/>
	)
}

export default Field
