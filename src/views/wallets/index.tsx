import React, { useState } from 'react'
import styles from './index.module.css'
import Button from '../../components/button'
import Modal from '../../components/modal'
import Input from '../../components/input'
import { generateWallet } from '../../utils/wallet'
import WalletList from './components/walletsList'

const Wallets: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [walletName, setWalletName] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState({ walletName: '', password: '' })

	function handleCreateWallet() {
		const newErrors = {
			walletName: walletName ? '' : 'Wallet Name is required.',
			password: password ? '' : 'Password is required.',
		}

		setErrors(newErrors)

		if (newErrors.walletName || newErrors.password) return
		generateWallet({ name: walletName, password })
		setIsModalOpen(false)
		setWalletName('')
		setPassword('')
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Your Wallets</h1>
			<div className={styles.walletsContainer}>
				<Button label="Create Wallet" onClick={() => setIsModalOpen(true)} />
				<Modal title="Create a New Wallet" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
					<form
						className={styles.form}
						onSubmit={(e) => {
							e.preventDefault()
							handleCreateWallet()
						}}
					>
						<Input
							label="Wallet Name"
							placeholder="Enter wallet name"
							value={walletName}
							onChange={(e) => setWalletName(e.target.value)}
							required
							errorMessage={errors.walletName}
						/>
						<Input
							label="Password"
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							errorMessage={errors.password}
						/>
						<Button label="Create Wallet" type="submit" />
					</form>
				</Modal>
				<WalletList />
			</div>
		</div>
	)
}

export default Wallets
