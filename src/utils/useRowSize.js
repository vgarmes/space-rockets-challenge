import { useState, useEffect } from 'react';
import { PAGE_SIZE, MIN_CHILD_WIDTH } from '../constants';

function useRowSize(container) {
  const [cardsPerRow, setCardsPerRow] = useState(PAGE_SIZE);

  useEffect(() => {
    function handleResize() {
      setCardsPerRow(
        Math.floor(container.current.offsetWidth / MIN_CHILD_WIDTH)
      );
    }
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [container]);

  return cardsPerRow;
}

export default useRowSize;
