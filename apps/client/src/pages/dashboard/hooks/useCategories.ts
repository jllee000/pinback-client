import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getDashboardCategories,
  getArticlesByCategory,
} from '@pages/dashboard/apis';
import type { Category } from '@pages/dashboard/types/api';
import {
  createQueryConfig,
  ERROR_STATUS,
} from '@pages/dashboard/utils/queryConfig';

export const useCategories = (isInitialized: boolean) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [categoryPageSize, setCategoryPageSize] = useState(12);
  const [categoryTotalCounts, setCategoryTotalCounts] = useState<
    Record<number, number>
  >({});

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useQuery({
    queryKey: ['dashboardCategories'],
    ...createQueryConfig(
      async () => {
        const response = await getDashboardCategories();
        return response.data;
      },
      {
        staleTime: 10 * 60 * 1000,
        excludeStatuses: [
          ...ERROR_STATUS.AUTH,
          ...ERROR_STATUS.NOT_FOUND,
          ...ERROR_STATUS.METHOD_NOT_ALLOWED,
        ],
      }
    ),
  });

  // 카테고리별 총 개수 조회
  useEffect(() => {
    const fetchAllCategoryCounts = async () => {
      if (categoriesData?.data?.categories && isInitialized) {
        const categories = categoriesData.data.categories;
        const counts: Record<number, number> = {};

        const promises = categories.map(async (category: Category) => {
          try {
            const response = await getArticlesByCategory(
              category.categoryId,
              0,
              1
            );
            return {
              categoryId: category.categoryId,
              totalCount: response.data.data.totalArticle,
            };
          } catch (error) {
            console.error(
              `카테고리 ${category.categoryId} 총 개수 조회 실패:`,
              error
            );
            return {
              categoryId: category.categoryId,
              totalCount: 0,
            };
          }
        });

        const results = await Promise.all(promises);

        results.forEach(
          (result: { categoryId: number; totalCount: number }) => {
            counts[result.categoryId] = result.totalCount;
          }
        );

        setCategoryTotalCounts(counts);
      }
    };

    fetchAllCategoryCounts();
  }, [categoriesData, isInitialized]);

  // 에러 로깅
  useEffect(() => {
    if (categoriesError) {
      // 에러 처리
    }
  }, [categoriesError]);

  const handleCategoryClick = (_category: string, categoryId?: number) => {
    if (categoryId) {
      setSelectedCategoryId(categoryId);
      setCategoryPageSize(12);
    } else {
      setSelectedCategoryId(null);
    }
  };

  const resetCategoryPageSize = () => setCategoryPageSize(12);
  const setCategoryPageSizeToTotal = (total: number) =>
    setCategoryPageSize(total);

  return {
    categoriesData,
    isLoadingCategories,
    categoriesError,
    selectedCategoryId,
    categoryPageSize,
    categoryTotalCounts,
    handleCategoryClick,
    resetCategoryPageSize,
    setCategoryPageSizeToTotal,
  };
};
