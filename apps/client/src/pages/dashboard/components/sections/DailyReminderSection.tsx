import SectionContent from '@pages/dashboard/components/common/layout/SectionContent';
import SectionTitle from '@pages/dashboard/components/common/layout/SectionTitle';
import AllViewButton from '@pages/dashboard/components/ui/buttons/AllViewButton';
import DailyReminderCard from '@pages/dashboard/components/ui/cards/DailyReminderCard';
import type { Article } from '@pages/dashboard/types/api';
import { memo, useState } from 'react';

interface DailyReminderSectionProps {
  handlePopUpOpen?: () => void;
  articles?: Article[];
  onArticleRead?: (articleId: number) => void;
  isLoading?: boolean;
  handleArticleDotClick: (articleId: number) => void;
}

const DailyReminderSection = ({
  handlePopUpOpen,
  articles = [],
  onArticleRead,
  isLoading = false,
  handleArticleDotClick,
}: DailyReminderSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const showAllViewBtn = articles.length > 12;

  const visibleCards = isExpanded ? articles : articles.slice(0, 12);

  const handleTimerComplete = () => {
    // 타이머 완료 처리
  };

  const handleAllViewClick = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleCardClick = (article: Article) => {
    onArticleRead?.(article.articleId);

    if (article.url) {
      window.open(article.url, '_blank', 'noopener,noreferrer');
    }
  };

  if (isLoading) {
    return (
      <section className="space-y-4" aria-label="데일리 리마인드">
        <div className="flex items-center gap-2">
          <SectionTitle text="데일리 리마인드" />
        </div>
        <div className="my-[1.3rem]">
          <SectionContent onComplete={handleTimerComplete} />
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

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4" aria-label="데일리 리마인드">
      <div className="flex items-center gap-2">
        <SectionTitle text="데일리 리마인드" />
      </div>
      <div className="my-[1.3rem]">
        <SectionContent onComplete={handleTimerComplete} />
      </div>
      <div className="mt-[6rem] grid grid-cols-4 justify-center gap-[2.3rem]">
        {visibleCards.map((card, index) => (
          <DailyReminderCard
            key={`daily-reminder-${card.articleId}-${index}`}
            title={card.url}
            memo={card.memo}
            url={card.url}
            savedAt={card.remindAt || card.createdAt}
            isRead={card.isRead}
            handlePopUpOpen={handlePopUpOpen}
            onClick={() => handleCardClick(card)}
            onDotClick={() => handleArticleDotClick(card.articleId)}
          />
        ))}
      </div>
      {showAllViewBtn && (
        <div className="mt-[4.8rem] flex justify-center">
          <AllViewButton onClick={handleAllViewClick} isExpanded={isExpanded} />
        </div>
      )}
    </section>
  );
};

export default memo(DailyReminderSection);
