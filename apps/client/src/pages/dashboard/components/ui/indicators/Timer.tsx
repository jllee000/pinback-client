import { memo, useState, useEffect } from 'react';

interface TimerProps {
  targetTime?: string;
  onComplete?: () => void;
}

const Timer = ({ targetTime, onComplete }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState('00:00:00');

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date();
      let targetDateTime: Date;

      if (targetTime) {
        targetDateTime = new Date(targetTime);
      } else {
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(8, 0, 0, 0);
        targetDateTime = tomorrow;
      }

      const diff = targetDateTime.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft('00:00:00');
        if (onComplete) {
          onComplete();
        }
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetTime, onComplete]);

  return <span>{timeLeft}</span>;
};

export default memo(Timer);
