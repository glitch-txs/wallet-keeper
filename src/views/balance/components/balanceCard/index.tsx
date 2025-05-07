import React from 'react'
import styles from './index.module.css'
import { getTokenWithBalance } from '../../../../utils/balance'
import type { Address, Chain } from 'viem'
import type { Token } from '../../../../types'
import { useQuery } from '@tanstack/react-query'

type BalanceCardProps = {
	userAddress: Address
	token?: Token
	chain: Chain
	onDelete: () => void
}

const BalanceCard: React.FC<BalanceCardProps> = ({ userAddress, token, chain, onDelete }) => {
	const { data: tokenWithBalance, isLoading } = useQuery({
		queryKey: ['balance', token?.address, chain.id, userAddress],
		queryFn: () => getTokenWithBalance({ chain, userAddress, token }),
		enabled: Boolean(userAddress),
	})

	return (
		<div className={styles.card}>
			<div className={styles.leftSection}>
				<span className={styles.name}>{token ? token.name : chain.nativeCurrency.name}</span>
			</div>
			<div className={styles.rightSection}>
				<p className={styles.value}>
					{isLoading ? '-' : `${tokenWithBalance?.symbol} ${tokenWithBalance?.formattedBalance}`}
				</p>

				{token && (
					<button className={styles.iconButton} onClick={onDelete}>
						<img src="delete.svg" alt="delete" />
					</button>
				)}
			</div>
		</div>
	)
}

export default BalanceCard
