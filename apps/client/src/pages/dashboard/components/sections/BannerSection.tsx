import { memo } from 'react';
import { Banner } from '@pages/dashboard/components/ui';
import type { BannerStage } from '@pages/dashboard/constants';

interface BannerSectionProps {
  acornCount: BannerStage;
  remindDateTime?: string;
  children?: React.ReactNode;
  showImage?: boolean;
  className?: string;
}

const BannerSection = ({
  acornCount,
  remindDateTime,
  children,
  showImage = true,
  className,
}: BannerSectionProps) => {
  return (
    <section className={className ?? ''} aria-label="배너 섹션">
      <Banner
        acornCount={acornCount}
        remindDateTime={remindDateTime}
        showImage={showImage}
      >
        {children}
      </Banner>
    </section>
  );
};

export default memo(BannerSection);
