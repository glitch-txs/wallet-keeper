import React, { useState } from 'react';
import styles from './index.module.css';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.tooltipWrapper} onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {children}
      {isVisible && <div className={styles.tooltip}>{content}</div>}
    </div>
  );
};

export default Tooltip;