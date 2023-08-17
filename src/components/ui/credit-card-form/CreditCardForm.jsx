import { useState } from 'react'
import Field from '../field/Field'
import styles from './CreditCardForm.module.scss'
import { formatCreditCardNumberWithDashes } from '../../../utils/format/format-credit-card-number'
import CreditCardFormTitle from './credit-card-form-title/CreditCardFormTitle'
import { formatDate } from '../../../utils/format/format-to-date'
import Button from '../button/Button'

const CreditCardForm = () => {
	const [fieldValueCreditCardNumber, setFieldValueCreditCardNumber] =
		useState('')
	const [
		fieldValueCreditCardExpirationDate,
		setFieldValueCreditCardExpirationDate
	] = useState('')
	const [fieldValueCreditCardCvc, setFieldValueCreditCardCvc] = useState('')
	const [isValidationDate, setIsValidationDate] = useState(true)

	const handleField = (e, type, limit, variant) => {
		// const stringRegExp =

		// if (stringRegExp.test(e.target.value)) return

		if (type === 'number') {
			let valueNumber = e.target.value.replace(/[^0-9]/g, '')
			const dateRegExp = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/

			if (limit) valueNumber = valueNumber.substring(0, limit)

			variant === 'card-number' &&
				setFieldValueCreditCardNumber(
					formatCreditCardNumberWithDashes(valueNumber)
				)
			if (variant === 'expiration-date') {
				dateRegExp.test(valueNumber)
					? setIsValidationDate(false)
					: setIsValidationDate(true)

				setFieldValueCreditCardExpirationDate(formatDate(valueNumber))
			}
			variant === 'cvc' && setFieldValueCreditCardCvc(valueNumber)
		}
	}

	return (
		<form
			onSubmit={e => {
				e.preventDefault()

				const targetEl = e.target
				const formData = new FormData(targetEl)
				console.log(formData)
			}}
			className={styles.credit_card_form}
		>
			<div>
				<CreditCardFormTitle
					title='credit card number'
					required='required'
					error={fieldValueCreditCardNumber.length < 19}
				/>
				<Field
					name='card-number'
					type='text'
					placeholder='XXXX XXXX XXXX XXXX'
					value={fieldValueCreditCardNumber}
					onInput={e => handleField(e, 'number', 16, 'card-number')}
				/>
			</div>
			<div>
				<div>
					<CreditCardFormTitle
						title='expiration date'
						required='required'
						error={isValidationDate}
						isValidationDate={
							isValidationDate &&
							fieldValueCreditCardExpirationDate.length === 5
						}
					/>
					<Field
						name='expiration-date'
						type='text'
						placeholder='MM/YY'
						value={fieldValueCreditCardExpirationDate}
						onInput={e => handleField(e, 'number', 4, 'expiration-date')}
					/>
				</div>
				<div>
					<CreditCardFormTitle
						title='CVC'
						required='required'
						error={fieldValueCreditCardCvc.length < 3}
					/>
					<Field
						name='cvc'
						type='text'
						placeholder='*****'
						value={fieldValueCreditCardCvc}
						onInput={e => handleField(e, 'number', 3, 'cvc')}
					/>
				</div>
			</div>
			<Button>Send</Button>
		</form>
	)
}

export default CreditCardForm
