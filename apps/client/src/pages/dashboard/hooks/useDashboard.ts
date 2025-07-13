import { useState, useCallback } from 'react';
import { UI_TEXT } from '@pages/dashboard/constants';

export const useDashboard = () => {
  const [activeCategory, setActiveCategory] = useState(UI_TEXT.category.all);
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
