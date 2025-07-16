import type { TimerState } from '@shared/types';

export const calculateRemainingTime = (
  serverTime: string,
  targetTime: string
): TimerState => {
  const now = new Date(serverTime).getTime();
  const target = new Date(targetTime).getTime();

  const diffMs = target - now;

  if (diffMs <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
  }

  const diffSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(diffSeconds / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
    isExpired: false,
  };
};

export const formatTime = (
  hours: number,
  minutes: number,
  seconds: number
): string => {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const calculateTimeDifference = (serverTime: string): number => {
  const serverTimestamp = new Date(serverTime).getTime();
  const clientTimestamp = Date.now();
  return serverTimestamp - clientTimestamp;
};

export const getEstimatedServerTime = (serverTimeOffset: number): string => {
  const estimatedServerTime = new Date(Date.now() + serverTimeOffset);
  return estimatedServerTime.toISOString();
};
