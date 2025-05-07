import React, { useState } from 'react'
import Input from '../../../../../../components/input'
import Button from '../../../../../../components/button'
import styles from './index.module.css'

interface KeyFormProps {
	onSubmitPassword: (password: string) => void
}

const KeyForm: React.FC<KeyFormProps> = ({ onSubmitPassword }) => {
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		if (!password) {
			setError('Password is required.')
		}
		onSubmitPassword(password)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<Input
				label="Wallet Name"
				placeholder="Enter wallet name"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
				errorMessage={error}
			/>
			<Button label="Create Wallet" type="submit" />
		</form>
	)
}

export default KeyForm
