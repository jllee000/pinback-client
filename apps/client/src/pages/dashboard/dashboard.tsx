import { POP_UP_AREA_Z_INDEX } from '@/constants';
import ModalPop from '@/shared/components/ui/modalPop/ModalPop';
import { Header } from '@shared/components';
import {
  BannerSection,
  BookmarkSection,
  DailyReminderSection,
} from '@pages/dashboard/components';
import { useDashboard } from '@pages/dashboard/hooks/useDashboard';
import type { Category } from '@pages/dashboard/types/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const {
    activeCategory,
    isAllViewExpanded,
    acornCount,
    categoriesData,
    unreadArticlesData,
    dailyReminderData,
    categoryArticlesData,
    categoryTotalCounts,
    acornData,
    isLoadingUnreadArticles,
    isLoadingDailyReminder,
    isLoadingCategoryArticles,
    handleCategoryClick,
    handleAllViewClick,
    handleArticleRead,
    setIsInitialized,
  } = useDashboard();

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  // 토큰 체크 및 온보딩 리다이렉트
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (!token || token === 'undefined' || token === 'null' || token === '') {
      navigate('/onboarding');
      return;
    }

    setIsInitialized(true);
  }, [navigate, setIsInitialized]);

  // 모달 팝업이 열릴 때 스크롤 고정
  useEffect(() => {
    if (isPopUpOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPopUpOpen]);

  const hasDailyReminders =
    (dailyReminderData?.data?.articles?.length || 0) > 0;

  const categories: Category[] = categoriesData?.data?.categories || [];
  const totalUnreadArticle = unreadArticlesData?.data?.totalUnreadArticle || 0;

  const remindDateTime = acornData?.data?.remindDateTime;

  const getCurrentArticles = () => {
    if (categoryArticlesData?.data?.articles) {
      return categoryArticlesData.data.articles;
    }
    return unreadArticlesData?.data?.articles || [];
  };

  const currentArticles = getCurrentArticles();

  const getCurrentTotalCount = () => {
    if (categoryArticlesData?.data?.totalArticle !== undefined) {
      return categoryArticlesData.data.totalArticle;
    }
    return totalUnreadArticle;
  };

  const currentTotalCount = getCurrentTotalCount();
  const currentIsLoading = isLoadingCategoryArticles || isLoadingUnreadArticles;

  const getBookmarkSectionMargin = () => {
    if (hasDailyReminders) {
      return 'mt-[14rem]';
    }
    return 'mt-[7.7rem]';
  };

  const onPopUpOpen = () => {
    setIsPopUpOpen(true);
  };

  return (
    <div className="bg-background flex min-h-screen flex-col items-center">
      {isPopUpOpen && (
        <div
          className={`absolute z-${POP_UP_AREA_Z_INDEX} flex h-[100dvh] w-full items-center justify-center bg-[#0000005b]`}
          onClick={() => setIsPopUpOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ModalPop onClose={() => setIsPopUpOpen(false)} />
          </div>
        </div>
      )}
      <Header />

      <main
        className={`${isPopUpOpen ? 'fixed' : 'relative'} mx-auto w-[144rem]`}
      >
        <BannerSection
          acornCount={acornCount}
          className="mt-[7.4rem]"
          remindDateTime={remindDateTime}
        />
        <div className="mt-[7.7rem] px-[11.9rem] pb-[3.6rem] pr-[12rem]">
          {hasDailyReminders && (
            <DailyReminderSection
              articles={dailyReminderData?.data?.articles}
              onArticleRead={handleArticleRead}
              isLoading={isLoadingDailyReminder}
              handlePopUpOpen={onPopUpOpen}
            />
          )}
          <div className={getBookmarkSectionMargin()}>
            <BookmarkSection
              activeCategory={activeCategory}
              categories={categories}
              bookmarks={currentArticles}
              onCategoryClick={handleCategoryClick}
              onAllViewClick={handleAllViewClick}
              onArticleRead={handleArticleRead}
              isAllViewExpanded={isAllViewExpanded}
              isLoading={currentIsLoading}
              totalUnreadArticle={totalUnreadArticle}
              totalArticleCount={currentTotalCount}
              categoryTotalCounts={categoryTotalCounts}
              handlePopUpOpen={onPopUpOpen}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
