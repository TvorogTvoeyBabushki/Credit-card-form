import { useEffect, useMemo, useState } from 'react'
import { formatCreditCardNumberWithDashes } from '../../../../utils/format/format-credit-card-number'
import { formatDate } from '../../../../utils/format/format-to-date'

export const useCreditCardForm = () => {
	const [fieldValueCardholderName, setFieldValueCardholderName] = useState('')
	const [fieldValueCreditCardNumber, setFieldValueCreditCardNumber] =
		useState('')
	const [
		fieldValueCreditCardExpirationDate,
		setFieldValueCreditCardExpirationDate
	] = useState('')
	const [fieldValueCreditCardCvc, setFieldValueCreditCardCvc] = useState('')
	const [isValidationCardholderName, setIsValidationCardholderName] =
		useState(true)
	const [isValidationDate, setIsValidationDate] = useState(true)
	const [isSuccessData, setIsSuccessData] = useState(false)
	const [isValidationForm, setIsValidationForm] = useState(false)
	const [localStorageData, setLocalStorageData] = useState([])
	const [isPushLocalStorageData, setIsPushLocalStorageData] = useState(false)
	const [isDuplicateData, setIsDuplicateData] = useState(false)

	useEffect(() => {
		if (localStorage.getItem('credit card data')) {
			setLocalStorageData(JSON.parse(localStorage.getItem('credit card data')))
		}

		return () => setIsPushLocalStorageData(false)
	}, [isPushLocalStorageData])

	useEffect(() => {
		if (isSuccessData) {
			const timerId = setTimeout(() => {
				setIsSuccessData(false)

				clearTimeout(timerId)
			}, 2000)
		}
	}, [isSuccessData])

	const handleField = (e, type, limit, variant) => {
		if (type === 'string') {
			let valueNumber = e.target.value
				.replace(/[0-9]/g, '')
				.replace(/[^a-zа-яё0-9\s]/gi, '')

			const spaceLetter = valueNumber.match(/\s/g)

			if (spaceLetter && spaceLetter.length > 1) return

			valueNumber.split(' ').forEach((item, index) => {
				index !== 0 && item
					? setIsValidationCardholderName(false)
					: setIsValidationCardholderName(true)
			})

			setFieldValueCardholderName(valueNumber.trimStart().toLowerCase())
		}

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

	const handleSubmit = e => {
		e.preventDefault()

		if (
			isValidationCardholderName ||
			fieldValueCreditCardNumber.length < 19 ||
			(isValidationDate && fieldValueCreditCardExpirationDate.length === 5) ||
			fieldValueCreditCardCvc.length < 3
		) {
			setIsSuccessData(false)
			setIsValidationForm(true)

			return
		}

		const targetEl = e.target
		const formData = new FormData(targetEl)
		let isDuplicate = false

		localStorageData.forEach(data => {
			if (
				data.cardholder === formData.get('cardholder') &&
				data['card-number'] === formData.get('card-number')
			) {
				isDuplicate = true
				setIsDuplicateData(isDuplicate)
			}
		})

		setIsValidationForm(false)

		if (isDuplicate) {
			setIsSuccessData(false)

			return
		}

		setIsPushLocalStorageData(true)
		setIsDuplicateData(false)

		const data = [...localStorageData, Object.fromEntries([...formData])]

		localStorage.setItem('credit card data', JSON.stringify(data))

		setIsSuccessData(true)
		setFieldValueCardholderName('')
		setFieldValueCreditCardNumber('')
		setFieldValueCreditCardExpirationDate('')
		setFieldValueCreditCardCvc('')
		setIsValidationCardholderName(true)
		setIsValidationDate(true)
	}

	return useMemo(
		() => ({
			handleSubmit,
			isDuplicateData,
			isSuccessData,
			isValidationForm,
			fieldValueCardholderName,
			isValidationCardholderName,
			fieldValueCreditCardNumber,
			isValidationDate,
			fieldValueCreditCardExpirationDate,
			fieldValueCreditCardCvc,
			handleField
		}),
		[
			isDuplicateData,
			isSuccessData,
			isValidationForm,
			fieldValueCardholderName,
			isValidationCardholderName,
			fieldValueCreditCardNumber,
			isValidationDate,
			fieldValueCreditCardExpirationDate,
			fieldValueCreditCardCvc
		]
	)
}
