import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

export const generateWallet = () => {
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);

  return {
    address: account.address,
    privateKey,
  };
};
