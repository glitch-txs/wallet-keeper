import React from 'react';
import styles from './index.module.css';
import { useWalletStore } from '../../../store';
import { blo } from 'blo';

const AccountProfile: React.FC = () => {
  const activeWallet = useWalletStore((state)=> state.activeWallet);

  if(activeWallet){
    return (
      <div className={styles.walletInfo}>
        <figure className={styles.avatar}>
          <img alt={activeWallet.address} src={blo(activeWallet.address as `0x${string}`)}/>
        </figure>
          <div className={styles.walletDetails}>
            <h2 className={styles.walletName}>{activeWallet.name}</h2>
            <p className={styles.walletAddress}>
              {activeWallet.address.slice(0, 6)}...{activeWallet.address.slice(-4)}
            </p>
          </div>
      </div>
    );
  }

  return null
};

export default AccountProfile;
