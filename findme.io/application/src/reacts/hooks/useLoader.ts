import { useEffect, useState } from 'react';

export const useLoader = (timeout: number = 0, isOptimized: boolean = true) => {
  const [getLoading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 0);
    return () => {
      setLoading(false);
    };
  }, []);

  return isOptimized ? getLoading : true;
};
