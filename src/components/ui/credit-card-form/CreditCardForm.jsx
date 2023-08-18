import styles from './CreditCardForm.module.scss'

import { useCreditCardForm } from './hooks/useCreditCardForm'
import CardholderItem from './credit-card-form-item/CardholderItem'
import CardNumberItem from './credit-card-form-item/CardNumberItem'
import CardDateCvcItem from './credit-card-form-item/CardDateCvcItem'
import CardBtnItem from './credit-card-form-item/CardBtnItem'

const CreditCardForm = () => {
	const {
		fieldValueCardholderName,
		handleField,
		fieldValueCreditCardCvc,
		fieldValueCreditCardExpirationDate,
		fieldValueCreditCardNumber,
		isValidationCardholderName,
		isValidationDate,
		handleSubmit,
		isDuplicateData,
		isSuccessData,
		isValidationForm
	} = useCreditCardForm()

	return (
		<form onSubmit={handleSubmit} className={styles.credit_card_form}>
			<CardholderItem
				fieldValueCardholderName={fieldValueCardholderName}
				handleField={handleField}
				isValidationCardholderName={isValidationCardholderName}
			/>
			<CardNumberItem
				fieldValueCreditCardNumber={fieldValueCreditCardNumber}
				handleField={handleField}
			/>
			<CardDateCvcItem
				fieldValueCreditCardCvc={fieldValueCreditCardCvc}
				fieldValueCreditCardExpirationDate={fieldValueCreditCardExpirationDate}
				handleField={handleField}
				isValidationDate={isValidationDate}
				styles={styles}
			/>

			<CardBtnItem
				isDuplicateData={isDuplicateData}
				isSuccessData={isSuccessData}
				isValidationForm={isValidationForm}
			/>
		</form>
	)
}

export default CreditCardForm
