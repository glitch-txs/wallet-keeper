import { useEffect, useRef } from 'react';

export const useFocusInput = ({ isModalOpen } :{isModalOpen: boolean}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isModalOpen && ref.current) {
      ref.current.focus();
    }
  }, [isModalOpen]);

  return { ref };
};
