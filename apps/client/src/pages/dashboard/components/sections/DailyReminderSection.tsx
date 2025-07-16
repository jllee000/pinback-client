import { memo, useState } from 'react';
import SectionTitle from '@pages/dashboard/components/common/layout/SectionTitle';
import SectionContent from '@pages/dashboard/components/common/layout/SectionContent';
import DailyReminderCard from '@pages/dashboard/components/ui/cards/DailyReminderCard';
import AllViewButton from '@pages/dashboard/components/ui/buttons/AllViewButton';
import { mockDailyReminderCards } from '@pages/dashboard/mockData';
interface DailyReminderSectionProps {
  handlePopUpOpen?: () => void;
}
const DailyReminderSection = ({
  handlePopUpOpen,
}: DailyReminderSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const showAllViewBtn = mockDailyReminderCards.length > 12;

  const visibleCards = isExpanded
    ? mockDailyReminderCards
    : mockDailyReminderCards.slice(0, 12);

  const handleTimerComplete = () => {
    // 타이머 완료 시 처리 로직
  };

  const handleAllViewClick = () => {
    setIsExpanded((prev) => !prev);
  };

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
            key={card.id || `daily-reminder-${card.savedAt}-${index}`}
            title={card.title}
            memo={card.memo}
            images={card.images}
            savedAt={card.savedAt}
            showAcornStamp={card.showAcornStamp}
            handlePopUpOpen={handlePopUpOpen}
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
