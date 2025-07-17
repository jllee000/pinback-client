import type { QueryFunction } from '@tanstack/react-query';

/**
 * 공통 에러 재시도 로직
 */
export const createRetryConfig = (excludeStatuses: number[] = []) => {
  return (failureCount: number, error: any) => {
    if (excludeStatuses.includes(error?.response?.status)) {
      return false;
    }
    return failureCount < 2;
  };
};

/**
 * 공통 쿼리 설정
 */
export const createQueryConfig = <T>(
  queryFn: QueryFunction<T>,
  options: {
    staleTime?: number;
    enabled?: boolean;
    excludeStatuses?: number[];
  } = {}
) => ({
  queryFn,
  staleTime: options.staleTime || 2 * 60 * 1000,
  enabled: options.enabled ?? true,
  retry: createRetryConfig(options.excludeStatuses),
  retryDelay: 1000,
});

/**
 * 에러 상태별 재시도 제외 상태 코드
 */
export const ERROR_STATUS = {
  AUTH: [401, 403],
  NOT_FOUND: [404],
  BAD_REQUEST: [400],
  SERVER_ERROR: [500],
  METHOD_NOT_ALLOWED: [405],
} as const;
