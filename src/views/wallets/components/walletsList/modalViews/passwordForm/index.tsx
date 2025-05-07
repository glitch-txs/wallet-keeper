import React, { useState } from 'react'
import Input from '../../../../../../components/input'
import Button from '../../../../../../components/button'
import styles from './index.module.css'

interface PasswordFormProps {
	onSubmitPassword: (password: string) => void
}

const PasswordForm: React.FC<PasswordFormProps> = ({ onSubmitPassword }) => {
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		setError(password ? "" : 'Password is required.')

		if (!password) return
		onSubmitPassword(password)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<Input
				label="Password"
				placeholder="Enter the wallet password"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
				errorMessage={error}
			/>
			<Button label="View Private Key" type="submit" />
		</form>
	)
}

export default PasswordForm
