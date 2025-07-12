import { memo } from 'react';
import { SectionTitle, SectionContent } from '@shared/components/features';

interface DailyReminderSectionProps {
  onComplete: () => void;
}

const DailyReminderSection = ({ onComplete }: DailyReminderSectionProps) => {
  return (
    <section className="space-y-4" aria-label="데일리 리마인드">
      <div className="flex items-center gap-2">
        <SectionTitle text="데일리 리마인드" />
      </div>
      <SectionContent onComplete={onComplete} />
    </section>
  );
};

export default memo(DailyReminderSection);
