import React from 'react';
import styles from './index.module.css';

interface WalletInfoProps {
  name: string;
  address: string;
  privateKey: string;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ name, address, privateKey }) => {
  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    alert("Copied to clipboard!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <p className={styles.label}>Account Name</p>
        <p className={styles.value}>{name}</p>
      </div>

      <div className={styles.field}>
        <p className={styles.label}>Address</p>
        <div className={styles.copyWrapper}>
          <p className={styles.value}>{address}</p>
          <img
            src="/copy.svg"
            alt="Copy Address"
            className={styles.copyIcon}
            onClick={() => handleCopy(address)}
          />
        </div>
      </div>

      <div className={styles.field}>
        <p className={styles.label}>Private Key</p>
        <div className={styles.copyWrapper}>
          <p className={styles.value}>{privateKey}</p>
          <img
            src="/copy.svg"
            alt="Copy Private Key"
            className={styles.copyIcon}
            onClick={() => handleCopy(privateKey)}
          />
        </div>
      </div>
    </div>
  );
};

export default WalletInfo;
