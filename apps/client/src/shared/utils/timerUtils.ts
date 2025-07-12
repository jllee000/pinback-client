import type { TimerState } from '@shared/types';

/**
 * 서버 시간과 목표 시간 사이의 남은 시간을 계산합니다.
 */
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

/**
 * 시간을 HH:MM:SS 형식으로 포맷팅합니다.
 */
export const formatTime = (
  hours: number,
  minutes: number,
  seconds: number
): string => {
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * 클라이언트 시간과 서버 시간의 차이를 계산합니다 (밀리초).
 */
export const calculateTimeDifference = (serverTime: string): number => {
  const serverTimestamp = new Date(serverTime).getTime();
  const clientTimestamp = Date.now();
  return serverTimestamp - clientTimestamp;
};

/**
 * 클라이언트 시간에 서버 시간 오프셋을 적용하여 서버 시간을 추정합니다.
 */
export const getEstimatedServerTime = (serverTimeOffset: number): string => {
  const estimatedServerTime = new Date(Date.now() + serverTimeOffset);
  return estimatedServerTime.toISOString();
};
