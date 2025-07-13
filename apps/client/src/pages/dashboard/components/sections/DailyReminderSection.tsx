import { memo } from 'react';
import SectionTitle from '@pages/dashboard/components/features/SectionTitle';
import DailyReminderCard from '@pages/dashboard/components/ui/cards/DailyReminderCard';
import { mockDailyReminderCards } from '@pages/dashboard/mockData';

const DailyReminderSection = () => {
  return (
    <section className="space-y-4" aria-label="데일리 리마인드">
      <div className="flex items-center gap-2">
        <SectionTitle text="데일리 리마인드" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockDailyReminderCards.map((card, index) => (
          <DailyReminderCard
            key={index}
            title={card.title}
            memo={card.memo}
            images={card.images}
            savedAt={card.savedAt}
            showAcornStamp={card.showAcornStamp}
          />
        ))}
      </div>
    </section>
  );
};

export default memo(DailyReminderSection);
