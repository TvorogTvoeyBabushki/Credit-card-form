export const formatDate = cardDate => {
	return cardDate.replace(/(\d{2})(?=\d)/g, '$1/')
}
