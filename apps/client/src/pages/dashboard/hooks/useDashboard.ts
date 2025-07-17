import { useState, useCallback } from 'react';
import { useAcornCount } from './useAcornCount';
import { useCategories } from './useCategories';
import { useArticles } from './useArticles';

export const useDashboard = () => {
  const [activeCategory, setActiveCategory] = useState('안 읽은 정보');
  const [isAllViewExpanded, setIsAllViewExpanded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const {
    acornCount,
    isLoadingAcornCount,
    acornData,
    isLoadingAcorn,
    acornError,
    fetchAcornCount,
    updateAcornCount,
  } = useAcornCount(isInitialized);

  const {
    categoriesData,
    isLoadingCategories,
    categoriesError,
    selectedCategoryId,
    categoryPageSize,
    categoryTotalCounts,
    handleCategoryClick: handleCategoryClickBase,
    resetCategoryPageSize,
    setCategoryPageSizeToTotal,
  } = useCategories(isInitialized);

  const {
    unreadArticlesData,
    dailyReminderData,
    categoryArticlesData,
    isLoadingUnreadArticles,
    isLoadingDailyReminder,
    isLoadingCategoryArticles,
    unreadArticlesError,
    dailyReminderError,
    categoryArticlesError,
    handleArticleRead,
    resetPageSizes,
    setPageSizesToTotal,
    refetchUnreadArticles,
    refetchDailyReminder,
    refetchCategoryArticles,
  } = useArticles(isInitialized, selectedCategoryId, categoryPageSize);

  // 카테고리 클릭 핸들러 (카테고리명도 함께 업데이트)
  const handleCategoryClick = useCallback(
    (category: string, categoryId?: number) => {
      setActiveCategory(category);
      handleCategoryClickBase(category, categoryId);
    },
    [handleCategoryClickBase]
  );

  // 전체보기 클릭 핸들러
  const handleAllViewClick = useCallback(() => {
    setIsAllViewExpanded((prev) => {
      const newExpanded = !prev;

      if (newExpanded) {
        if (selectedCategoryId) {
          const totalCategoryArticles =
            categoryArticlesData?.data?.totalArticle || 0;
          setCategoryPageSizeToTotal(totalCategoryArticles);
        } else {
          const totalUnreadArticles =
            unreadArticlesData?.data?.totalUnreadArticle || 0;
          const totalDailyReminderArticles =
            dailyReminderData?.data?.totalArticle || 0;
          setPageSizesToTotal(totalUnreadArticles, totalDailyReminderArticles);
        }
      } else {
        resetPageSizes();
        resetCategoryPageSize();
      }

      return newExpanded;
    });
  }, [
    selectedCategoryId,
    categoryArticlesData,
    unreadArticlesData,
    dailyReminderData,
    setCategoryPageSizeToTotal,
    setPageSizesToTotal,
    resetPageSizes,
    resetCategoryPageSize,
  ]);

  return {
    // 상태
    activeCategory,
    isAllViewExpanded,
    acornCount,
    isLoadingAcornCount,
    isInitialized,

    // 데이터
    acornData,
    categoriesData,
    unreadArticlesData,
    dailyReminderData,
    categoryArticlesData,
    categoryTotalCounts,

    // 로딩 상태
    isLoadingAcorn,
    isLoadingCategories,
    isLoadingUnreadArticles,
    isLoadingDailyReminder,
    isLoadingCategoryArticles,
    isLoadingServerTime: false,

    // 에러 상태
    acornError,
    categoriesError,
    unreadArticlesError,
    dailyReminderError,
    categoryArticlesError,

    // 액션 핸들러
    handleCategoryClick,
    handleAllViewClick,
    updateAcornCount,
    handleArticleRead,

    // 리페치 함수
    refetchAcornCount: fetchAcornCount,
    refetchUnreadArticles,
    refetchDailyReminder,
    refetchCategoryArticles,
    refetchServerTime: undefined,

    // 초기화
    setIsInitialized,
  };
};
