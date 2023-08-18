import clsx from 'clsx'
import CreditCardFormTitle from '../credit-card-form-title/CreditCardFormTitle'
import Field from '../../field/Field'

const CardDateCvcItem = ({
	styles,
	isValidationDate,
	fieldValueCreditCardExpirationDate,
	handleField,
	fieldValueCreditCardCvc
}) => {
	return (
		<div
			className={clsx(styles.date_cvc, {
				[styles.validation]:
					isValidationDate && fieldValueCreditCardExpirationDate.length === 5
			})}
		>
			<div>
				<CreditCardFormTitle
					title='expiration date'
					required='required'
					error={isValidationDate}
					isValidationDate={
						isValidationDate && fieldValueCreditCardExpirationDate.length === 5
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
	)
}

export default CardDateCvcItem
