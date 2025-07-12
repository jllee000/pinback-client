import { memo } from 'react';
import {
  SectionTitle,
  BookmarkCategory,
} from '@shared/components/features';
import {
  BookmarkCard,
  AllViewButton,
  EmptyState,
} from '@shared/components/ui';
import {
  GRID,
  UI_TEXT,
} from '@shared/constants';
import { SPACING_CLASSES } from '@shared/utils/styleUtils';
import type { Category } from '@shared/types';

interface BookmarkCardProps {
  image?: string;
  memo?: string;
  title: string;
  isRead?: boolean;
}

interface BookmarkSectionProps {
  activeCategory: string;
  categories: Category[];
  bookmarks: BookmarkCardProps[];
  onCategoryClick: (category: string) => void;
  onAllViewClick: () => void;
  isAllViewExpanded?: boolean;
}

const BookmarkSection = ({
  activeCategory,
  categories,
  bookmarks,
  onCategoryClick,
  onAllViewClick,
  isAllViewExpanded = false,
}: BookmarkSectionProps) => {
  // 현재 카테고리의 북마크만 필터링
  const filteredBookmarks = activeCategory === UI_TEXT.category.all 
    ? bookmarks 
    : bookmarks.filter(() => {
        // 실제로는 카테고리별 필터링 로직이 필요하지만, 
        // 현재는 mock 데이터이므로 간단히 처리
        return true;
      });

  return (
    <section
      className={SPACING_CLASSES.sectionMargin}
      aria-label={UI_TEXT.dashboard.bookmarkSection}
    >
      <SectionTitle text={UI_TEXT.dashboard.bookmarkSection} />
      <div className="mb-4">
        <AllViewButton
          onClick={onAllViewClick}
          isExpanded={isAllViewExpanded}
        />
      </div>

      <nav
        className={`flex ${SPACING_CLASSES.categoryGap} mb-6`}
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

      {filteredBookmarks.length > 0 ? (
        <div
          className={`grid grid-cols-${GRID.bookmark.cols} ${SPACING_CLASSES.cardGap}`}
          role="grid"
          aria-label="북마크 목록"
        >
          {filteredBookmarks.map((card, idx) => (
            <div
              key={`bookmark-${idx}`}
              className="cursor-pointer"
              role="gridcell"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                }
              }}
            >
              <BookmarkCard {...card} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <EmptyState
            title="저장한 정보는 다 꺼내봤어요!"
            description="치삐가 다음 도토리를 기다리고 있어요"
            image="/src/assets/illustrations/empty-states/information.svg"
            imageAlt="북마크가 없음을 나타내는 일러스트레이션"
          />
        </div>
      )}
    </section>
  );
};

export default memo(BookmarkSection);
