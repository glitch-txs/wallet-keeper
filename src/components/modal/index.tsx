import React, { type ReactNode } from 'react'
import ReactDOM from 'react-dom'
import styles from './index.module.css'

type ModalProps = {
	title: string
	children: ReactNode
	isOpen: boolean
	onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ title, children, isOpen, onClose }) => {
	if (!isOpen) return null

	return ReactDOM.createPortal(
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={styles.header}>
					<h2 className={styles.title}>{title}</h2>
					<button className={styles.closeButton} onClick={onClose}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<line x1="18" y1="6" x2="6" y2="18" stroke="#000" strokeWidth="2" strokeLinecap="round" />
							<line x1="6" y1="6" x2="18" y2="18" stroke="#000" strokeWidth="2" strokeLinecap="round" />
						</svg>
					</button>
				</div>
				<div className={styles.content}>{children}</div>
			</div>
		</div>,
		document.body,
	)
}

export default Modal
