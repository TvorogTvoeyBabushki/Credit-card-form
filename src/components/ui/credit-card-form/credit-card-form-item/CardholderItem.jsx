import Field from '../../field/Field'
import CreditCardFormTitle from '../credit-card-form-title/CreditCardFormTitle'

const CardholderItem = ({
	isValidationCardholderName,
	fieldValueCardholderName,
	handleField
}) => {
	return (
		<div>
			<CreditCardFormTitle
				title='cardholder name'
				required='required'
				error={isValidationCardholderName}
			/>
			<Field
				name='cardholder'
				type='text'
				placeholder='NAME SURNAME'
				value={fieldValueCardholderName}
				onInput={e => handleField(e, 'string', 0, 'cardholder-name')}
			/>
		</div>
	)
}

export default CardholderItem
