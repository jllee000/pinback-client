import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getServerTime, getActiveReminderTimer } from '@shared/apis/timerApi';
import {
  calculateRemainingTime,
  calculateTimeDifference,
  getEstimatedServerTime,
  formatTime,
} from '@shared/utils/timerUtils';
import type { TimerState } from '@shared/types';

interface UseServerTimerReturn {
  timerState: TimerState;
  formattedTime: string;
  isLoading: boolean;
  error: Error | null;
}

export const useServerTimer = (
  onComplete?: () => void
): UseServerTimerReturn => {
  const [timerState, setTimerState] = useState<TimerState>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const [serverTimeOffset, setServerTimeOffset] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const {
    data: serverTimeData,
    isLoading: isServerTimeLoading,
    error: serverTimeError,
  } = useQuery({
    queryKey: ['serverTime'],
    queryFn: getServerTime,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  });

  const {
    data: reminderTimer,
    isLoading: isReminderLoading,
    error: reminderError,
  } = useQuery({
    queryKey: ['activeReminderTimer'],
    queryFn: getActiveReminderTimer,
    staleTime: 2 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (serverTimeData?.currentTime) {
      const offset = calculateTimeDifference(serverTimeData.currentTime);
      setServerTimeOffset(offset);
    }
  }, [serverTimeData]);

  const updateTimer = useCallback(() => {
    if (!reminderTimer?.reminderTime || !reminderTimer.isActive) {
      setTimerState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
      });
      return;
    }

    const estimatedServerTime = getEstimatedServerTime(serverTimeOffset);
    const newTimerState = calculateRemainingTime(
      estimatedServerTime,
      reminderTimer.reminderTime
    );

    setTimerState(newTimerState);

    if (
      newTimerState.isExpired &&
      (timerState.hours > 0 || timerState.minutes > 0 || timerState.seconds > 0)
    ) {
      onCompleteRef.current?.();
    }
  }, [
    reminderTimer,
    serverTimeOffset,
    timerState.hours,
    timerState.minutes,
    timerState.seconds,
  ]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    updateTimer();

    intervalRef.current = setInterval(updateTimer, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [updateTimer]);

  const formattedTime = formatTime(
    timerState.hours,
    timerState.minutes,
    timerState.seconds
  );

  return {
    timerState,
    formattedTime,
    isLoading: isServerTimeLoading || isReminderLoading,
    error: serverTimeError || reminderError,
  };
};
