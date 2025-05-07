import React, { useState } from 'react'
import WalletCard from '../walletCard'
import styles from './index.module.css'
import { useWalletStore } from '../../../../store'
import { useNavigate } from 'react-router-dom'
import Modal from '../../../../components/modal'
import KeyForm from './modalViews/keyForm'
import WalletInfo from './modalViews/walletInfo'
import { decryptPrivateKey } from '../../../../utils/crypto'

const WalletList: React.FC = () => {
	const [modalView, setModalView] = useState<'password' | 'walletInformation'>('password')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [privateKey, setPrivateKey] = useState('')

	const activeWallet = useWalletStore((state) => state.activeWallet)
	const wallets = useWalletStore((state) => state.wallets)

	const removeWallet = useWalletStore((state) => state.removeWallet)
	const setActiveWallet = useWalletStore((state) => state.setActiveWallet)

	const navigate = useNavigate()

	function handleViewBalance(address: string) {
		setActiveWallet(address)
		navigate('/balance')
	}

	function handleDelete(address: string) {
		removeWallet(address)
	}

	function handleViewKey(address: string) {
		setActiveWallet(address)
		setIsModalOpen(true)
		setModalView('password')
	}

	/** The user's password is requested before revealing the private key */
	function handleSubmitPassword(password: string) {
		const wallet = wallets.find((w) => w.address === activeWallet?.address)
		if (!wallet) throw Error('Unable to find the selected wallet.')

		const { encryptedPrivateKey, salt } = wallet
		const _privateKey = decryptPrivateKey({ password, encryptedPrivateKey, salt })

		if (!_privateKey) throw Error('Error while decrypting private key.')

		setPrivateKey(_privateKey)
		setModalView('walletInformation')
	}

	function handleCloseModal() {
		setIsModalOpen(false)
		setPrivateKey('')
		setModalView('password')
	}

	return (
		<div className={styles.container}>
			{wallets.length ? (
				wallets.map((wallet) => (
					<WalletCard
						key={wallet.address}
						walletName={wallet.name}
						address={wallet.address}
						isSelected={activeWallet?.address === wallet.address}
						onViewBalance={() => handleViewBalance(wallet.address)}
						onViewKey={() => handleViewKey(wallet.address)}
						onDelete={() => handleDelete(wallet.address)}
						onClick={() => setActiveWallet(wallet.address)}
					/>
				))
			) : (
				<p className={styles.emptyState}>No wallets available. Please create a new wallet.</p>
			)}

			<Modal title="Wallet Details" isOpen={isModalOpen} onClose={handleCloseModal}>
				{modalView === 'password' ? (
					<KeyForm onSubmitPassword={handleSubmitPassword} />
				) : (
					<WalletInfo
						onModalClose={handleCloseModal}
						name={activeWallet?.name || ''}
						address={activeWallet?.address || ''}
						privateKey={privateKey}
					/>
				)}
			</Modal>
		</div>
	)
}

export default WalletList
