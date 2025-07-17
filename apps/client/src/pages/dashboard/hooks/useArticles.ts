import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUnreadArticles,
  getDailyReminderArticles,
  getArticlesByCategory,
  updateArticleReadStatus,
} from '@pages/dashboard/apis';
import type {
  ReadStatusResponse,
  ApiResponse,
} from '@pages/dashboard/types/api';
import { getCurrentKSTDateTime } from '@pages/dashboard/utils/dateUtils';
import {
  createQueryConfig,
  ERROR_STATUS,
} from '@pages/dashboard/utils/queryConfig';

export const useArticles = (
  isInitialized: boolean,
  selectedCategoryId: number | null,
  categoryPageSize: number
) => {
  const queryClient = useQueryClient();
  const [unreadPageSize, setUnreadPageSize] = useState(12);
  const [dailyReminderPageSize, setDailyReminderPageSize] = useState(12);

  // 안읽은 아티클 조회
  const {
    data: unreadArticlesData,
    isLoading: isLoadingUnreadArticles,
    refetch: refetchUnreadArticles,
    error: unreadArticlesError,
  } = useQuery({
    queryKey: ['unreadArticles', 0, unreadPageSize],
    ...createQueryConfig(
      async () => {
        const response = await getUnreadArticles(0, unreadPageSize);
        return response.data;
      },
      {
        staleTime: 2 * 60 * 1000,
        enabled: isInitialized,
        excludeStatuses: [
          ...ERROR_STATUS.AUTH,
          ...ERROR_STATUS.NOT_FOUND,
          ...ERROR_STATUS.METHOD_NOT_ALLOWED,
        ],
      }
    ),
  });

  // 데일리 리마인드 아티클 조회
  const {
    data: dailyReminderData,
    isLoading: isLoadingDailyReminder,
    refetch: refetchDailyReminder,
    error: dailyReminderError,
  } = useQuery({
    queryKey: ['dailyReminderArticles', 0, dailyReminderPageSize],
    ...createQueryConfig(
      async () => {
        const response = await getDailyReminderArticles(
          getCurrentKSTDateTime(),
          0,
          dailyReminderPageSize
        );
        return response.data;
      },
      {
        staleTime: 5 * 60 * 1000,
        enabled: isInitialized,
        excludeStatuses: [
          ...ERROR_STATUS.BAD_REQUEST,
          ...ERROR_STATUS.AUTH,
          ...ERROR_STATUS.METHOD_NOT_ALLOWED,
          ...ERROR_STATUS.SERVER_ERROR,
        ],
      }
    ),
  });

  // 카테고리별 아티클 조회
  const {
    data: categoryArticlesData,
    isLoading: isLoadingCategoryArticles,
    refetch: refetchCategoryArticles,
    error: categoryArticlesError,
  } = useQuery({
    queryKey: ['categoryArticles', selectedCategoryId, 0, categoryPageSize],
    ...createQueryConfig(
      async () => {
        const response = await getArticlesByCategory(
          selectedCategoryId as number,
          0,
          categoryPageSize
        );
        return response.data;
      },
      {
        staleTime: 2 * 60 * 1000,
        enabled: isInitialized && selectedCategoryId !== null,
        excludeStatuses: [
          ...ERROR_STATUS.AUTH,
          ...ERROR_STATUS.NOT_FOUND,
          ...ERROR_STATUS.METHOD_NOT_ALLOWED,
          ...ERROR_STATUS.BAD_REQUEST,
          ...ERROR_STATUS.SERVER_ERROR,
        ],
      }
    ),
  });

  // 읽음 상태 업데이트 뮤테이션
  const updateReadStatusMutation = useMutation<
    ApiResponse<ReadStatusResponse>,
    unknown,
    number
  >({
    mutationFn: async (articleId: number) => {
      const response = await updateArticleReadStatus(articleId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['acornCount'] });
      queryClient.invalidateQueries({ queryKey: ['unreadArticles'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardCategories'] });
      queryClient.invalidateQueries({ queryKey: ['categoryArticles'] });
      queryClient.invalidateQueries({ queryKey: ['dailyReminderArticles'] });
    },
    onError: () => {
      // 에러 처리
    },
  });

  // 에러 로깅
  useEffect(() => {
    if (unreadArticlesError) {
      // 에러 처리
    }
  }, [unreadArticlesError]);

  useEffect(() => {
    if (dailyReminderError) {
      // 에러 처리
    }
  }, [dailyReminderError]);

  useEffect(() => {
    if (categoryArticlesError) {
      // 에러 처리
    }
  }, [categoryArticlesError]);

  const handleArticleRead = (articleId: number) => {
    updateReadStatusMutation.mutate(articleId);
  };

  const resetPageSizes = () => {
    setUnreadPageSize(12);
    setDailyReminderPageSize(12);
  };

  const setPageSizesToTotal = (
    totalUnread: number,
    totalDailyReminder: number
  ) => {
    setUnreadPageSize(totalUnread);
    setDailyReminderPageSize(totalDailyReminder);
  };

  return {
    unreadArticlesData,
    dailyReminderData,
    categoryArticlesData,
    isLoadingUnreadArticles,
    isLoadingDailyReminder,
    isLoadingCategoryArticles,
    isUpdatingReadStatus: updateReadStatusMutation.isPending,
    unreadArticlesError,
    dailyReminderError,
    categoryArticlesError,
    handleArticleRead,
    resetPageSizes,
    setPageSizesToTotal,
    refetchUnreadArticles,
    refetchDailyReminder,
    refetchCategoryArticles,
  };
};
