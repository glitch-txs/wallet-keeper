import React, { useState } from 'react'
import styles from './index.module.css'
import Button from '../../components/button'
import WalletList from './components/walletsList'
import CreateWalletModal from './components/createWalletModal'

const Wallets: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Your Wallets</h1>
			<div className={styles.walletsContainer}>
				<Button label="Create Wallet" onClick={() => setIsModalOpen(true)} />
				<CreateWalletModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
				<WalletList />
			</div>
		</div>
	)
}

export default Wallets
