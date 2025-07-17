import { POP_UP_AREA_Z_INDEX } from '@/constants';
import ModalPop from '@/shared/components/ui/modalPop/ModalPop';
import {
  BannerSection,
  BookmarkSection,
  DailyReminderSection,
} from '@pages/dashboard/components';
import { useDashboard } from '@pages/dashboard/hooks/useDashboard';
import type { BookmarkCardProps } from '@pages/dashboard/mockData';
import { mockBookmarkCards } from '@pages/dashboard/mockData';
import { Header } from '@shared/components';
import { useMemo, useState } from 'react';
const CATEGORY_LIST = [
  { id: 'unread', text: '안 읽은 정보' },
  { id: 'all', text: '전체' },
  { id: 'frontend', text: '프론트엔드' },
  { id: 'backend', text: '백엔드' },
  { id: 'design', text: '디자인' },
  { id: 'devops', text: 'DevOps' },
];
function getCategoryCount(cards: BookmarkCardProps[], id: string): number {
  if (id === 'unread') {
    return cards.filter((card) => !card.isRead).length;
  }
  if (id === 'all') {
    return cards.length;
  }
  return cards.filter((card) => card.categoryId === id).length;
}

const Dashboard = () => {
  const {
    activeCategory,
    isAllViewExpanded,
    acornCount,
    handleCategoryClick,
    handleAllViewClick,
  } = useDashboard();
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const hasBookmarks = mockBookmarkCards.length > 0;

  const categories = useMemo(() => {
    if (mockBookmarkCards.length === 0) {
      return [{ id: 'unread', text: '안 읽은 정보', count: 0 }];
    }
    return CATEGORY_LIST.map((cat) => ({
      ...cat,
      count: getCategoryCount(mockBookmarkCards, cat.id),
    }));
  }, [mockBookmarkCards]);

  const getBookmarkSectionMargin = () => {
    return hasBookmarks ? 'mt-[14rem]' : '';
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
        className={`${isPopUpOpen ? 'fixed' : 'relative'} mx-auto w-[144rem] pt-[9.6rem]`}
      >
        <BannerSection
          acornCount={acornCount}
          className="mt-[7.4rem]"
        ></BannerSection>
        <div className="px-[11.9rem] pb-[3.6rem] pr-[12rem]">
          {hasBookmarks && (
            <DailyReminderSection handlePopUpOpen={onPopUpOpen} />
          )}
          <div className={getBookmarkSectionMargin()}></div>
          <BookmarkSection
            activeCategory={activeCategory}
            categories={categories}
            bookmarks={mockBookmarkCards}
            onCategoryClick={handleCategoryClick}
            onAllViewClick={handleAllViewClick}
            isAllViewExpanded={isAllViewExpanded}
            handlePopUpOpen={onPopUpOpen}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
