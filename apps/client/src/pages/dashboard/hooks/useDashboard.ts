import { useState, useCallback } from 'react';
import { UI_TEXT } from '@shared/constants';

export const useDashboard = () => {
  const [activeCategory, setActiveCategory] = useState(UI_TEXT.category.all);
  const [isAllViewExpanded, setIsAllViewExpanded] = useState(false);

  const handleCountdownComplete = useCallback(() => {
    console.log('Countdown completed');
  }, []);

  const handleCategoryClick = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const handleAllViewClick = useCallback(() => {
    setIsAllViewExpanded((prev) => !prev);
  }, []);

  return {
    activeCategory,
    isAllViewExpanded,
    handleCountdownComplete,
    handleCategoryClick,
    handleAllViewClick,
  };
}; 
