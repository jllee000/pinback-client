import { getAcornCountWithRemind } from '@pages/dashboard/apis/axios/user';
import type { BannerStage } from '@pages/dashboard/constants';
import { getCurrentKSTDateTime } from '@pages/dashboard/utils/dateUtils';
import {
  createQueryConfig,
  ERROR_STATUS,
} from '@pages/dashboard/utils/queryConfig';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

export const useAcornCount = (isInitialized: boolean) => {
  const [acornCount, setAcornCount] = useState<BannerStage>(0);
  const [isLoadingAcornCount, setIsLoadingAcornCount] = useState(false);

  const {
    data: acornData,
    isLoading: isLoadingAcorn,
    refetch: refetchAcorn,
    error: acornError,
  } = useQuery({
    queryKey: ['acornCount'],
    ...createQueryConfig(
      async () => {
        const response = await getAcornCountWithRemind(getCurrentKSTDateTime());
        return response.data;
      },
      {
        staleTime: 10 * 60 * 1000,
        enabled: isInitialized,
        excludeStatuses: [
          ...ERROR_STATUS.AUTH,
          ...ERROR_STATUS.NOT_FOUND,
          ...ERROR_STATUS.METHOD_NOT_ALLOWED,
          ...ERROR_STATUS.SERVER_ERROR,
        ],
      }
    ),
  });

  const fetchAcornCount = useCallback(async () => {
    try {
      setIsLoadingAcornCount(true);
      const result = await refetchAcorn();
      if (result.data?.data?.acornCount !== undefined) {
        const newAcornCount = result.data.data.acornCount as BannerStage;

        setAcornCount(newAcornCount);
      }
    } catch (error) {
      console.error('도토리 개수 조회 실패:', error);
      setAcornCount(0);
    } finally {
      setIsLoadingAcornCount(false);
    }
  }, [refetchAcorn]);

  const updateAcornCount = useCallback((count: BannerStage) => {
    setAcornCount(count);
  }, []);

  useEffect(() => {
    if (acornError) {
      // 에러 처리
    }
  }, [acornError]);

  useEffect(() => {
    if (acornData?.data?.acornCount !== undefined) {
      const newAcornCount = acornData.data.acornCount as BannerStage;

      setAcornCount(newAcornCount);
    }
  }, [acornData]);

  return {
    acornCount,
    isLoadingAcornCount,
    acornData,
    isLoadingAcorn,
    acornError,
    fetchAcornCount,
    updateAcornCount,
  };
};
