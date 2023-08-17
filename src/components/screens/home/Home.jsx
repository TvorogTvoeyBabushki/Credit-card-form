import Layout from '../../layout/Layout'
import CreditCardForm from '../../ui/credit-card-form/CreditCardForm'
import styles from './Home.module.scss'

const Home = () => {
	return (
		<Layout>
			<main className={styles.home}>
				<div className="container">
					<CreditCardForm />
				</div>
			</main>
		</Layout>
	)
}

export default Home
