import { useState, useEffect } from 'react';

export const useTwoFactor = (initialSeconds: number = 30) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [expired, setExpired] = useState(false);

  // Timer de expiración
  useEffect(() => {
    if (expired) return; // no iniciar si ya expiró

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setExpired(true); // marca como expirado
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [expired]);

  const resetTimer = () => {
    setSeconds(initialSeconds);
    setExpired(false);
  };

  return { seconds, expired, resetTimer };
};
