import React, { useState } from 'react'
import Modal from '../../../../components/modal'
import styles from './index.module.css'
import Input from '../../../../components/input'
import Button from '../../../../components/button'
import { useWalletStore } from '../../../../store'
import toast from 'react-hot-toast'

type CreateWalletModalProps = {
	setIsModalOpen: (isModalOpen: boolean) => void
	isModalOpen: boolean
}

const CreateWalletModal: React.FC<CreateWalletModalProps> = ({ isModalOpen, setIsModalOpen }) => {
	const [walletName, setWalletName] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState({ walletName: '', password: '' })

	const addWallet = useWalletStore((state) => state.addWallet)

	function handleCreateWallet() {
		const newErrors = {
			walletName: walletName ? '' : 'Wallet Name is required.',
			password: password ? '' : 'Password is required.',
		}

		setErrors(newErrors)

		if (newErrors.walletName || newErrors.password) return
		const newWallet = addWallet({ name: walletName, password })
		if (newWallet) {
			toast.success('Wallet Created Successfully!')
		} else {
			toast.error('An error occurred.')
		}
		setIsModalOpen(false)
		setWalletName('')
		setPassword('')
	}

	return (
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
	)
}

export default CreateWalletModal
