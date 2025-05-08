import React, { useState } from 'react'
import Input from '../../../../../../components/input'
import Button from '../../../../../../components/button'
import styles from './index.module.css'
import toast from 'react-hot-toast'
import { useFocusInput } from '../../../../../../hooks/useFocusInput'

interface PasswordFormProps {
	onSubmitPassword: (password: string) => (string | null)
	isModalOpen: boolean
}

const PasswordForm: React.FC<PasswordFormProps> = ({ onSubmitPassword, isModalOpen }) => {
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		setError(password ? "" : 'Password is required.')

		if (!password) return
		const privateKey = onSubmitPassword(password)
		if(!privateKey){
			toast.error('Incorrect password!')
		}
	}

	const { ref } = useFocusInput({ isModalOpen })

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
				ref={ref}
			/>
			<Button label="View Private Key" type="submit" />
		</form>
	)
}

export default PasswordForm
