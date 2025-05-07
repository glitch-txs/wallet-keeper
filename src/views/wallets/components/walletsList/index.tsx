import React from 'react';
import WalletCard from '../walletCard';
import styles from './index.module.css';
import { useWalletStore } from '../../../../store';

const WalletList: React.FC = () => {
  const activeWallet = useWalletStore((state) => state.activeWallet);
  const wallets = useWalletStore((state) => state.wallets);
  const setActiveWallet = useWalletStore((state) => state.setActiveWallet);

  return (
    <div className={styles.container}>
      {wallets.length ? wallets.map((wallet) => (
        <WalletCard
          key={wallet.address}
          walletName={wallet.name}
          address={wallet.address}
          isSelected={activeWallet?.address === wallet.address}
          onClick={() => setActiveWallet(wallet.address)}
        />
      )):
      <p className={styles.emptyState}>No wallets available. Please create a new wallet.</p>
      }
    </div>
  );
};

export default WalletList;
