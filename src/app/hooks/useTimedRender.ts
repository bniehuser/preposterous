import { useEffect, useState } from 'react';

export const useTimedRender = (interval = 5000) => {
  const [, setCount] = useState<number>(0);
  useEffect(() => {
    const timer = setInterval(() => setCount(c => c+1), interval);
    return () => clearInterval(timer);
  })
}
