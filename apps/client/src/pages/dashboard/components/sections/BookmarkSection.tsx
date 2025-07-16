import { memo } from 'react';
import SectionTitle from '@pages/dashboard/components/common/layout/SectionTitle';
import BookmarkCategory from '@pages/dashboard/components/common/display/BookmarkCategory';
import BookmarkCount from '@pages/dashboard/components/common/display/BookmarkCount';
import ReusableEmptyState from '@shared/components/ui/display/ReusableEmptyState';
import AllViewButton from '@pages/dashboard/components/ui/buttons/AllViewButton';
import BookmarkCard from '@pages/dashboard/components/ui/cards/BookmarkCard';
import { UI_TEXT } from '@pages/dashboard/constants';
import { DASHBOARD_CONSTANTS } from '@pages/dashboard/constants/dashboard';
import { SPACING_CLASSES } from '@shared/utils/styleUtils';
import type { Category } from '@shared/types';

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
  bookmarks: BookmarkCardProps[];
  onCategoryClick: (category: string) => void;
  onAllViewClick: () => void;
  isAllViewExpanded?: boolean;
  handlePopUpOpen?: () => void;
}

const BookmarkSection = ({
  activeCategory,
  categories,
  bookmarks,
  onCategoryClick,
  onAllViewClick,
  isAllViewExpanded = false,
  handlePopUpOpen,
}: BookmarkSectionProps) => {
  const getFilteredBookmarks = () => {
    if (activeCategory === UI_TEXT.category.all) {
      return bookmarks;
    }

    if (activeCategory === DASHBOARD_CONSTANTS.CATEGORY_TYPES.UNREAD) {
      return bookmarks.filter((bookmark) => !bookmark.isRead);
    }

    const category = categories.find((cat) => cat.text === activeCategory);
    return bookmarks.filter(
      (bookmark) => category && bookmark.categoryId === category.id
    );
  };

  const filteredBookmarks = getFilteredBookmarks();

  const hasNoBookmarks = () => bookmarks.length === 0;
  const isUnreadCategory = () =>
    activeCategory === DASHBOARD_CONSTANTS.CATEGORY_TYPES.UNREAD;
  const hasUnreadBookmarks = () =>
    bookmarks.some((bookmark) => !bookmark.isRead);

  const filteredCount = filteredBookmarks.length;
  const showAllViewBtn =
    filteredCount > DASHBOARD_CONSTANTS.INITIAL_BOOKMARK_DISPLAY_COUNT;

  const getEmptyStatePreset = () => {
    if (hasNoBookmarks()) {
      return 'url';
    }

    if (isUnreadCategory() && !hasUnreadBookmarks()) {
      return 'unread';
    }

    return 'unread';
  };

  const getContentMargin = () => {
    if (filteredCount > 0) {
      return 'mt-[2.4rem]';
    }
    return 'mt-[29.7rem]';
  };

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
          {categories.map((category) => (
            <BookmarkCategory
              key={category.id}
              id={category.id}
              text={category.text}
              count={category.count}
              isActive={activeCategory === category.text}
              onClick={() => onCategoryClick(category.text)}
              hideZeroCount={true}
            />
          ))}
        </nav>
      </div>

      {filteredCount > 0 && (
        <div className="mt-[6rem]">
          <BookmarkCount totalCount={filteredCount} />
        </div>
      )}

      <div className={getContentMargin()}>
        {filteredBookmarks.length > 0 ? (
          <div
            className="grid grid-cols-4 justify-center gap-[2.3rem]"
            role="grid"
            aria-label="북마크 목록"
          >
            {filteredBookmarks.map((card, idx) => (
              <div
                key={card.id || `bookmark-${idx}`}
                className="cursor-pointer"
                role="gridcell"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                  }
                }}
              >
                <BookmarkCard {...card} handlePopUpOpen={handlePopUpOpen} />
              </div>
            ))}
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
