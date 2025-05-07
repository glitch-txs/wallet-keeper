import React, { useState } from 'react'
import styles from './index.module.css'
import Button from '../../components/button'
import Modal from '../../components/modal'
import BalanceCard from './components/balanceCard'
import { useWalletStore } from '../../store'
import type { Address } from 'viem'
import Input from '../../components/input'

const Balance: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const activeWallet = useWalletStore((state) => state.activeWallet)
	const activeChain = useWalletStore((state) => state.activeChain)
	const [newTokenAddress, setNewTokenAddress] = useState('')
	const [error, setError] = useState('')

	const tokens = useWalletStore((state) => state.tokens)
	const addToken = useWalletStore((state) => state.addToken)
	async function handleAddToken() {
		setError(newTokenAddress ? '' : 'Token Address is required')
		if (!newTokenAddress) return

		await addToken({ address: newTokenAddress as Address, chain: activeChain })
		setIsModalOpen(false)
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Your Balance</h1>
			<div className={styles.balanceContainer}>
				<Button label="Add Token" onClick={() => setIsModalOpen(true)} />
				<BalanceCard userAddress={activeWallet?.address as Address} chain={activeChain} />
				{tokens.map((token) => (
					<BalanceCard userAddress={activeWallet?.address as Address} chain={activeChain} token={token} />
				))}
			</div>
			<Modal title="Add a New Token" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault()
						handleAddToken()
					}}
				>
					<Input
						label="Token Address"
						placeholder="Enter the token address"
						value={newTokenAddress}
						onChange={(e) => setNewTokenAddress(e.target.value)}
						required
						errorMessage={error}
					/>
					<Button label="Add Token" type="submit" />
				</form>
			</Modal>
		</div>
	)
}

export default Balance
