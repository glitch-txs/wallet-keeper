import { useState, useEffect, useRef } from 'react';
import styles from './index.module.css';
import type { Chain } from 'viem';
import { useWalletStore } from '../../../../store';

interface NetworkSelectorProps {
  options: Chain[];
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeChain = useWalletStore((state) => state.activeChain);
  const setActiveChain = useWalletStore((state) => state.setActiveChain);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: Chain) => {
    setActiveChain(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const filteredOptions = options.filter((chain) =>
    chain.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.selectorWrapper} ref={selectorRef}>
      <div className={styles.selector} onClick={handleOpen}>
        {isOpen ? (
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Search network..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span>{activeChain.name}</span>
        )}
        <div className={`${styles.icon} ${isOpen ? styles.open : ''}`} />
      </div>

      {isOpen && (
        <ul className={styles.dropdown}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((chain, index) => (
              <li
                key={index}
                className={`${styles.dropdownItem} ${
                  chain.name === activeChain.name ? styles.active : ''
                }`}
                onClick={() => handleSelect(chain)}
              >
                {chain.name}
              </li>
            ))
          ) : (
            <li className={styles.noResults}>No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default NetworkSelector;
