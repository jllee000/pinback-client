import { useState, useCallback, useEffect } from 'react';
import type { BannerStage } from '@pages/dashboard/constants';

export const useDashboard = () => {
  const [activeCategory, setActiveCategory] = useState('안 읽은 정보');
  const [isAllViewExpanded, setIsAllViewExpanded] = useState(false);
  const [acornCount, setAcornCount] = useState<BannerStage>(0);
  const [isLoadingAcornCount, setIsLoadingAcornCount] = useState(false);

  const fetchAcornCount = useCallback(async () => {
    try {
      setIsLoadingAcornCount(true);
      setAcornCount(7);
    } catch (error) {
      setAcornCount(0);
    } finally {
      setIsLoadingAcornCount(false);
    }
  }, []);

  useEffect(() => {
    fetchAcornCount();
  }, [fetchAcornCount]);

  const handleCategoryClick = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const handleAllViewClick = useCallback(() => {
    setIsAllViewExpanded((prev) => !prev);
  }, []);

  const updateAcornCount = useCallback((count: BannerStage) => {
    setAcornCount(count);
  }, []);

  return {
    activeCategory,
    isAllViewExpanded,
    acornCount,
    isLoadingAcornCount,
    handleCategoryClick,
    handleAllViewClick,
    updateAcornCount,
    refetchAcornCount: fetchAcornCount,
  };
};
