import BookmarkCategory from '@pages/dashboard/components/common/display/BookmarkCategory';
import BookmarkCount from '@pages/dashboard/components/common/display/BookmarkCount';
import SectionTitle from '@pages/dashboard/components/common/layout/SectionTitle';
import AllViewButton from '@pages/dashboard/components/ui/buttons/AllViewButton';
import BookmarkCard from '@pages/dashboard/components/ui/cards/BookmarkCard';
import { UI_TEXT } from '@pages/dashboard/constants';
import { DASHBOARD_CONSTANTS } from '@pages/dashboard/constants/dashboard';
import type { Article, Category } from '@pages/dashboard/types/api';
import ReusableEmptyState from '@shared/components/ui/display/ReusableEmptyState';
import { SPACING_CLASSES } from '@shared/utils/styleUtils';
import { memo } from 'react';

const INITIAL_DISPLAY_COUNT =
  DASHBOARD_CONSTANTS.INITIAL_BOOKMARK_DISPLAY_COUNT;
const UNREAD_CATEGORY = DASHBOARD_CONSTANTS.CATEGORY_TYPES.UNREAD;

interface BookmarkCardProps {
  id: string;
  image?: string;
  memo?: string;
  title: string;
  isRead?: boolean;
  categoryId: string;
  handlePopUpOpen?: () => void;
}

interface BookmarkSectionProps {
  activeCategory: string;
  categories: Category[];
  bookmarks: (BookmarkCardProps | Article)[];
  onCategoryClick: (category: string, categoryId?: number) => void;
  onAllViewClick: () => void;
  onArticleRead?: (articleId: number) => void;
  isAllViewExpanded?: boolean;
  handlePopUpOpen?: () => void;
  isLoading?: boolean;
  totalUnreadArticle?: number;
  totalArticleCount?: number;
  categoryTotalCounts?: Record<number, number>;
  handleArticleDotClick: (articleId: number) => void;
}

const BookmarkSection = ({
  activeCategory,
  categories,
  bookmarks,
  onCategoryClick,
  onAllViewClick,
  onArticleRead,
  isAllViewExpanded = false,
  handlePopUpOpen,
  isLoading = false,
  totalUnreadArticle = 0,
  totalArticleCount,
  categoryTotalCounts = {},
  handleArticleDotClick,
}: BookmarkSectionProps) => {
  // 유틸리티 함수들
  const hasNoBookmarks = () => bookmarks.length === 0;
  const isUnreadCategory = () => activeCategory === UNREAD_CATEGORY;
  const isCategoryEmpty = () => hasNoBookmarks();
  const isUnreadEmpty = () => totalUnreadArticle === 0;

  // 상태 계산
  // 서버에서 받은 데이터를 그대로 사용 (서버에서 이미 필터링된 데이터)
  const filteredBookmarks = bookmarks;
  const filteredCount = filteredBookmarks.length;
  const showAllViewBtn =
    (totalArticleCount || filteredCount) > INITIAL_DISPLAY_COUNT;

  const getEmptyStatePreset = () => {
    if (isUnreadCategory() && isUnreadEmpty()) {
      return 'unread';
    }

    if (!isUnreadCategory() && isCategoryEmpty()) {
      return 'url';
    }

    if (isCategoryEmpty()) {
      return 'url';
    }

    return 'unread';
  };

  const getContentMargin = () => {
    if (filteredCount > 0) {
      return 'mt-[2.4rem]';
    }
    return 'mt-[29.7rem]';
  };

  const handleCardClick = (bookmark: BookmarkCardProps | Article) => {
    if ('articleId' in bookmark && onArticleRead) {
      onArticleRead(bookmark.articleId);
    }

    if ('articleId' in bookmark && bookmark.url) {
      window.open(bookmark.url, '_blank', 'noopener,noreferrer');
    } else if ('url' in bookmark && bookmark.url) {
      // BookmarkCardProps 타입인 경우
      window.open(bookmark.url, '_blank', 'noopener,noreferrer');
    }
  };

  if (isLoading) {
    return (
      <section
        className={SPACING_CLASSES.sectionMargin}
        aria-label={UI_TEXT.dashboard.bookmarkSection}
      >
        <SectionTitle text={UI_TEXT.dashboard.bookmarkSection} />
        <div className="mt-[3rem]">
          <nav
            className="mb-6 flex flex-wrap gap-[2rem]"
            aria-label="북마크 카테고리 필터"
          >
            <BookmarkCategory
              key="unread"
              id="unread"
              text="안 읽은 정보"
              count={totalUnreadArticle}
              isActive={activeCategory === '안 읽은 정보'}
              onClick={() => onCategoryClick('안 읽은 정보')}
              hideZeroCount={true}
            />
            {categories.map((category) => (
              <BookmarkCategory
                key={category.categoryId}
                id={category.categoryId.toString()}
                text={category.categoryName}
                count={
                  categoryTotalCounts[category.categoryId] ||
                  category.unreadCount
                }
                isActive={activeCategory === category.categoryName}
                onClick={() =>
                  onCategoryClick(category.categoryName, category.categoryId)
                }
                hideZeroCount={true}
              />
            ))}
          </nav>
        </div>
        <div className="mt-[6rem] grid grid-cols-4 justify-center gap-[2.3rem]">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-[20rem] w-[30rem] animate-pulse rounded-[1.2rem] bg-gray-200"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      className={SPACING_CLASSES.sectionMargin}
      aria-label={UI_TEXT.dashboard.bookmarkSection}
    >
      <SectionTitle text={UI_TEXT.dashboard.bookmarkSection} />
      <div className="mt-[3rem]">
        <nav
          className="mb-6 flex flex-wrap gap-[2rem]"
          aria-label="북마크 카테고리 필터"
        >
          <BookmarkCategory
            key="unread"
            id="unread"
            text="안 읽은 정보"
            count={totalUnreadArticle}
            isActive={activeCategory === '안 읽은 정보'}
            onClick={() => onCategoryClick('안 읽은 정보')}
            hideZeroCount={true}
          />
          {categories.map((category) => (
            <BookmarkCategory
              key={category.categoryId}
              id={category.categoryId.toString()}
              text={category.categoryName}
              count={
                categoryTotalCounts[category.categoryId] || category.unreadCount
              }
              isActive={activeCategory === category.categoryName}
              onClick={() =>
                onCategoryClick(category.categoryName, category.categoryId)
              }
              hideZeroCount={true}
            />
          ))}
        </nav>
      </div>

      {filteredCount > 0 && (
        <div className="mt-[6rem]">
          <BookmarkCount totalCount={totalArticleCount || filteredCount} />
        </div>
      )}

      <div className={getContentMargin()}>
        {filteredBookmarks.length > 0 ? (
          <div
            className="grid grid-cols-4 justify-center gap-[2.3rem]"
            role="grid"
            aria-label="북마크 목록"
          >
            {filteredBookmarks.map(
              (card: BookmarkCardProps | Article, idx: number) => (
                <div
                  key={
                    'articleId' in card
                      ? card.articleId
                      : card.id || `bookmark-${idx}`
                  }
                  className="cursor-pointer"
                  role="gridcell"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(card);
                    }
                  }}
                  onClick={() => handleCardClick(card)}
                >
                  <BookmarkCard
                    {...('articleId' in card
                      ? {
                          id: card.articleId.toString(),
                          title: card.url,
                          memo: card.memo,
                          isRead: card.isRead,
                          categoryId: '1',
                          url: card.url,
                          handlePopUpOpen,
                        }
                      : card)}
                    onDotClick={() =>
                      handleArticleDotClick((card as Article).articleId)
                    }
                    handlePopUpOpen={handlePopUpOpen}
                  />
                </div>
              )
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <ReusableEmptyState preset={getEmptyStatePreset()} />
          </div>
        )}
      </div>

      {showAllViewBtn && (
        <div className="mt-[4.8rem] flex justify-center">
          <AllViewButton
            onClick={onAllViewClick}
            isExpanded={isAllViewExpanded}
          />
        </div>
      )}
    </section>
  );
};

export default memo(BookmarkSection);
