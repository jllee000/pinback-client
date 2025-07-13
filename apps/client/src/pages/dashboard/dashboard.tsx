import { useMemo } from 'react';
import { Header } from '@shared/components';
import {
  DailyReminderSection,
  BookmarkSection,
} from '@pages/dashboard/components';
import { useDashboard } from '@pages/dashboard/hooks/useDashboard';
import { mockBookmarkCards } from '@pages/dashboard/mockData';
import type { BookmarkCardProps } from '@pages/dashboard/mockData';

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
    handleCategoryClick,
    handleAllViewClick,
  } = useDashboard();

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

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <div className="fixed top-0 z-50 w-full">
        <Header />
      </div>
      <main className="mx-auto w-[144rem] pt-[9.6rem]">
        <div className="px-[11.9rem] pb-[3.6rem] pr-[12rem]">
          {hasBookmarks && <DailyReminderSection />}
          <div className={hasBookmarks ? 'mt-[14rem]' : 'mt-0'}>
            <BookmarkSection
              activeCategory={activeCategory}
              categories={categories}
              bookmarks={mockBookmarkCards}
              onCategoryClick={handleCategoryClick}
              onAllViewClick={handleAllViewClick}
              isAllViewExpanded={isAllViewExpanded}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
