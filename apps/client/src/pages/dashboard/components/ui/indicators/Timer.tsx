import { memo } from 'react';
import { useTimer } from '@pages/dashboard/hooks/useTimer';

interface TimerProps {
  onComplete?: () => void;
  reminderHour?: number;
}

const Timer = ({ onComplete: _onComplete, reminderHour = 9 }: TimerProps) => {
  const timeLeft = useTimer({ reminderHour });

  return <span>{timeLeft}</span>;
};

export default memo(Timer);
