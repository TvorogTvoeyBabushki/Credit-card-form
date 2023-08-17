import clsx from 'clsx'
import { LuAsterisk } from 'react-icons/lu'
import styles from './CreditCardFormTitle.module.scss'

const CreditCardFormTitle = ({ title, required, error, isValidationDate }) => {
	return (
		<div className={styles.credit_card_form_title}>
			<h3>{title}</h3>
			{required && (
				<>
					<LuAsterisk
						className={clsx('', {
							[styles.validation]: error
						})}
					/>
					{isValidationDate && <span>Data is invalid</span>}
				</>
			)}
		</div>
	)
}

export default CreditCardFormTitle
