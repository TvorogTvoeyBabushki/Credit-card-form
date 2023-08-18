import Field from '../../field/Field'
import CreditCardFormTitle from '../credit-card-form-title/CreditCardFormTitle'

const CardNumberItem = ({ fieldValueCreditCardNumber, handleField }) => {
	return (
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
	)
}

export default CardNumberItem
