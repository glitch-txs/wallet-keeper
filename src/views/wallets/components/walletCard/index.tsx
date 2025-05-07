import React from 'react'
import styles from './index.module.css'
import { blo } from 'blo'
import Tooltip from '../../../../components/tooltip'

type WalletCardProps = {
	walletName: string
	address: string
	isSelected?: boolean
	onClick?: () => void
	onViewBalance: () => void
	onDelete: () => void
	onViewKey: () => void
}

const WalletCard: React.FC<WalletCardProps> = ({
	walletName,
	address,
	isSelected = false,
	onViewBalance,
	onDelete,
	onViewKey,
	onClick,
}) => {
	return (
		<div className={`${styles.card} ${isSelected ? styles.selected : ''}`} onClick={onClick}>
			<div className={styles.leftSection}>
				<figure className={styles.avatar}>
					<img alt={address} src={blo(address as `0x${string}`)} />
				</figure>
				<span className={styles.name}>{walletName}</span>
				<span className={styles.account}>
					{address.slice(0, 6)}...{address.slice(-4)}
				</span>
			</div>
			<div className={styles.rightSection}>
				{isSelected && <span className={styles.selectedLabel}>Selected</span>}
				<div className={styles.icons}>
					<Tooltip content='View Balance' >
					<button className={styles.iconButton} onClick={onViewBalance}>
						<img src="coins.svg" alt="coins" />
					</button>
					</Tooltip>
					<Tooltip content='View Private Key' >
					<button className={styles.iconButton} onClick={onViewKey}>
						<img src="key.svg" alt="key" />
					</button>
					</Tooltip>
					<Tooltip content='Delete Wallet' >
					<button className={styles.iconButton} onClick={onDelete}>
						<img src="delete.svg" alt="delete" />
					</button>
					</Tooltip>
				</div>
			</div>
		</div>
	)
}

export default WalletCard
