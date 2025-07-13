import { useState, useCallback } from 'react';

export const useDashboard = () => {
  const [activeCategory, setActiveCategory] = useState('안 읽은 정보');
  const [isAllViewExpanded, setIsAllViewExpanded] = useState(false);

  const handleCategoryClick = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const handleAllViewClick = useCallback(() => {
    setIsAllViewExpanded((prev) => !prev);
  }, []);

  return {
    activeCategory,
    isAllViewExpanded,
    handleCategoryClick,
    handleAllViewClick,
  };
};
