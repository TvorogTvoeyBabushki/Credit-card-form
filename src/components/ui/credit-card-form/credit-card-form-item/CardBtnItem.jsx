import { LuAsterisk } from 'react-icons/lu'
import Button from '../../button/Button'

const CardBtnItem = ({ isValidationForm, isDuplicateData, isSuccessData }) => {
	return (
		<div>
			<Button>Send</Button>
			{isValidationForm && (
				<span>
					<LuAsterisk />
					Fields are required
				</span>
			)}
			{isDuplicateData && <span>The data already exists</span>}
			{isSuccessData && (
				<span
					style={{
						color: '#2e8677'
					}}
				>
					Data sent successfully
				</span>
			)}
		</div>
	)
}

export default CardBtnItem
