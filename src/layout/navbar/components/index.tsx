import React from 'react';
import styles from './index.module.css';

const AccountProfile: React.FC = () => {
  return (
    <div className={styles.walletInfo}>
      <figure className={styles.avatar}>
        <img src="/path-to-avatar-placeholder.png" alt="Wallet Avatar" />
      </figure>
      <div className={styles.walletDetails}>
        <h2 className={styles.walletName}>Address Name</h2>
        <p className={styles.walletAddress}>0x1234...abcd</p>
      </div>
    </div>
  );
};

export default AccountProfile;