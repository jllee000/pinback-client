import { memo } from 'react';
import { useServerTimer } from '@shared/hooks/useServerTimer';

interface TimerProps {
  onComplete?: () => void;
}

const Timer = ({ onComplete }: TimerProps) => {
  const { formattedTime, isLoading, error, timerState } =
    useServerTimer(onComplete);

  const getTimerText = () => {
    if (isLoading) {
      return '로딩 중...';
    }
    if (error) {
      return '시간 로드 실패';
    }
    if (timerState.isExpired) {
      return '타이머 완료';
    }
    return formattedTime;
  };

  const getTimerColor = () => {
    if (isLoading) {
      return 'text-gray400';
    }
    if (error) {
      return 'text-error400';
    }
    if (timerState.isExpired) {
      return 'text-gray400';
    }
    return 'text-gray400';
  };

  return <span className={`sub3-m ${getTimerColor()}`}>{getTimerText()}</span>;
};

export default memo(Timer);
