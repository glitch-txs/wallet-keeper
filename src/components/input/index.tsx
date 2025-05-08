import React, { type Ref } from 'react'
import styles from './index.module.css'

type InputProps = {
	label: string
	type?: 'text' | 'password' | 'email' | 'number'
	placeholder?: string
	value?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	required?: boolean
	errorMessage?: string
	ref?: Ref<HTMLInputElement> | null
}

const Input: React.FC<InputProps> = ({
	label,
	type = 'text',
	placeholder,
	value,
	onChange,
	required = false,
	errorMessage,
	ref
}) => {
	return (
		<div className={styles.inputContainer}>
			<label className={styles.label} htmlFor={label}>{label}</label>
			<input ref={ref} id={label} className={styles.input} type={type} placeholder={placeholder} value={value} onChange={onChange} />
			{required && errorMessage && <span className={styles.error}>{errorMessage}</span>}
		</div>
	)
}

export default Input
