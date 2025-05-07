import { Link, useLocation } from 'react-router-dom';
import styles from './index.module.css';
import AccountProfile from './components';

const navLinks: { path: string; label: string }[] = [
  { path: '/', label: 'Balance' },
  { path: '/wallets', label: 'Wallets' },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <AccountProfile />
      <ul className={styles.navItems}>
        {navLinks.map(({ path, label }) => (
          <li key={path}>
            <Link
              to={path}
              className={`${styles.navItem} ${location.pathname === path ? styles.active : ''}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
