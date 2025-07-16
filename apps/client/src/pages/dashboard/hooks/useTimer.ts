import { useEffect, useState } from 'react';

interface UseTimerProps {
  reminderHour?: number;
}

export const useTimer = ({ reminderHour = 9 }: UseTimerProps = {}) => {
  const [timeLeft, setTimeLeft] = useState('00:00:00');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const reminderTime = new Date();
      reminderTime.setHours(reminderHour, 0, 0, 0);

      if (now.getHours() >= reminderHour) {
        reminderTime.setDate(reminderTime.getDate() + 1);
      }

      const timeDifference = reminderTime.getTime() - now.getTime();
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [reminderHour]);

  return timeLeft;
};
