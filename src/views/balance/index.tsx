import React, { useState } from 'react'
import styles from './index.module.css'
import Button from '../../components/button'
import Modal from '../../components/modal'

const Balance: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Your Balance</h1>
			<div className={styles.balanceContainer}>
				<Button label="Add Token" onClick={() => setIsModalOpen(true)} />
			</div>
			<Modal title="Add a New Token" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
					a
			</Modal>
		</div>
	)
}

export default Balance
