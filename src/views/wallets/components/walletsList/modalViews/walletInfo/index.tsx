import React from 'react'
import styles from './index.module.css'
import Button from '../../../../../../components/button'
import toast from 'react-hot-toast'

interface WalletInfoProps {
	name: string
	address: string
	privateKey: string
	onModalClose: () => void
}

const WalletInfo: React.FC<WalletInfoProps> = ({ name, address, privateKey, onModalClose }) => {
	const handleCopy = (value: string) => {
		navigator.clipboard.writeText(value)
		toast.success('Copied to clipboard!')
	}

	return (
		<div className={styles.container}>
			<div className={styles.field}>
				<p className={styles.label}>Account Name</p>
				<p className={styles.value}>{name}</p>
			</div>

			<div className={styles.field}>
				<p className={styles.label}>Address</p>
				<div className={styles.copyWrapper}>
					<p className={styles.value}>{address}</p>
					<img src="/copy.svg" alt="Copy Address" className={styles.copyIcon} onClick={() => handleCopy(address)} />
				</div>
			</div>

			<div className={styles.field}>
				<p className={styles.label}>Private Key</p>
				<div className={styles.copyWrapper}>
					<p className={styles.value}>{privateKey}</p>
					<img
						src="/copy.svg"
						alt="Copy Private Key"
						className={styles.copyIcon}
						onClick={() => handleCopy(privateKey)}
					/>
				</div>
			</div>
			<Button label="Close" onClick={onModalClose} />
		</div>
	)
}

export default WalletInfo
