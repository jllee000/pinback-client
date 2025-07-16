import { memo } from 'react';
import { Banner } from '@pages/dashboard/components/ui';
import type { BannerStage } from '@pages/dashboard/constants';

interface BannerSectionProps {
  acornCount: BannerStage;
  children?: React.ReactNode;
  showImage?: boolean;
  className?: string;
}

const BannerSection = ({
  acornCount,
  children,
  showImage = true,
  className,
}: BannerSectionProps) => {
  return (
    <section className={className ?? ''} aria-label="배너 섹션">
      <Banner acornCount={acornCount} showImage={showImage}>
        {children}
      </Banner>
    </section>
  );
};

export default memo(BannerSection);
