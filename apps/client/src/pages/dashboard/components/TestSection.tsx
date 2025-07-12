import { memo } from 'react';
import { DailyReminderCard } from '@shared/components/ui';
import { GRID } from '@shared/constants';
import { SPACING_CLASSES } from '@shared/utils/styleUtils';
interface DailyReminderCardProps {
  title: string;
  memo?: string;
  images?: string[];
  savedAt: string;
  showAcornStamp?: boolean;
}

interface TestSectionProps {
  cards: DailyReminderCardProps[];
}

const TestSection = ({ cards }: TestSectionProps) => {
  return (
    <section className="pt-8" aria-label="컴포넌트 테스트">
      <div className="p-6">
        <div
          className={`grid grid-cols-1 md:grid-cols-${GRID.dailyReminder.cols.md} ${SPACING_CLASSES.cardGap}`}
        >
          {cards.map((card, idx) => (
            <div key={`daily-reminder-${idx}`} className="p-2">
              <DailyReminderCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(TestSection);
