import styles from './index.module.css'
import AccountProfile from './components'

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<h1 className={styles.title}>WALLET KEEPER</h1>
			<AccountProfile />
			{/* <ul className={styles.navItems}>
        {ROUTES.map(({ path, label }) => (
          <li key={path}>
            <Link
              to={path}
              className={`${styles.navItem} ${location.pathname === path ? styles.active : ''}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul> */}
		</nav>
	)
}

export default Navbar
