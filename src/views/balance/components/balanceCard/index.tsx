import React, { useEffect, useMemo } from 'react'
import styles from './index.module.css'
import { getTokenWithBalance } from '../../../../utils/balance'
import type { Address, Chain } from 'viem'
import type { Token } from '../../../../types'
import { useQuery } from '@tanstack/react-query'
import { useWalletStore } from '../../../../store'
import toast from 'react-hot-toast'

type BalanceCardProps = {
	userAddress: Address
	token?: Token
	chain: Chain
}

const BalanceCard: React.FC<BalanceCardProps> = ({ userAddress, token, chain }) => {
	const {
		data: tokenWithBalance,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['balance', token?.address, chain.id, userAddress],
		queryFn: async () => await getTokenWithBalance({ chain, userAddress, token }),
		enabled: Boolean(userAddress),
	})

	useEffect(() => {
		if (isError) {
			toast.error('Error while fetching balance.')
			console.error(error?.message)
		}
	}, [isError])

	const removeToken = useWalletStore((state) => state.removeToken)

	const balance = useMemo(() => {
		return tokenWithBalance
			? `${tokenWithBalance?.formattedBalance || 0} ${token ? tokenWithBalance?.symbol : chain.nativeCurrency.symbol}`
			: undefined
	}, [token, tokenWithBalance, chain])

	return (
		<div className={styles.card}>
			<div className={styles.leftSection}>
				<span className={styles.name}>{token ? token.name : chain.nativeCurrency.name}</span>
				{Boolean(token) || <span className={styles.nativeTag}>Native</span>}
			</div>
			<div className={styles.rightSection}>
				<p className={styles.value}>{balance || (isLoading ? 'Loading...' : '-')}</p>

				{token && (
					<button className={styles.iconButton} onClick={() => removeToken(token.address)}>
						<img src="delete.svg" alt="delete" />
					</button>
				)}
			</div>
		</div>
	)
}

export default BalanceCard
