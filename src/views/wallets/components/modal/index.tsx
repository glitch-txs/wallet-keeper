import React, { useState } from 'react'
import { generateWallet } from '../../../../utils/wallet'
import Modal from '../../../../components/modal'
import styles from './index.module.css'
import Input from '../../../../components/input'
import Button from '../../../../components/button'

type WalletModalProps = {
	setIsModalOpen: (isModalOpen: boolean) => void
	isModalOpen: boolean
}

const WalletModal: React.FC<WalletModalProps> = ({ isModalOpen, setIsModalOpen }) => {
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
		<Modal title="Create a New Wallet" isOpen={isModalOpen} onClose={() => false}>
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
	)
}

export default WalletModal
