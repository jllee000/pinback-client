import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@shared/utils/cn';
import BannerLevelInfo from '@pages/dashboard/components/ui/banner/BannerLevelInfo.tsx';
import BannerAcornBubble from '@pages/dashboard/components/ui/banner/BannerAcornBubble.tsx';
import BannerTimer from '@pages/dashboard/components/ui/banner/BannerTimer.tsx';
import BannerChippyImage from '@pages/dashboard/components/ui/banner/BannerChippyImage.tsx';
import BannerHeadline from '@pages/dashboard/components/ui/banner/BannerHeadline.tsx';

import progressBar0 from '@assets/banner/progress/progress-bar-0.svg';
import progressBar1 from '@assets/banner/progress/progress-bar-1.svg';
import progressBar2 from '@assets/banner/progress/progress-bar-2.svg';
import progressBar3 from '@assets/banner/progress/progress-bar-3.svg';
import progressBar4 from '@assets/banner/progress/progress-bar-4.svg';
import progressBar5 from '@assets/banner/progress/progress-bar-5.svg';
import progressBar6 from '@assets/banner/progress/progress-bar-6.svg';
import progressBar7 from '@assets/banner/progress/progress-bar-7.svg';

import bannerGraphic from '@assets/banner/배너_그래픽.svg';

const BANNER_POSITIONS = {
  HEADLINE: 'left-[12rem] top-[6.3rem]',
  PROGRESS_BAR: 'left-[11.3rem] top-[21.7rem]',
  LEFT_BUBBLE: 'left-[9.8rem] top-[29.5rem]',
  LEVEL_TEXT: 'left-[23.4rem] top-[29.5rem]',
  RIGHT_BUBBLE: 'left-[49.6rem] top-[29.5rem]',
  TIMER_BUBBLE: 'left-[75.3rem] top-[32.8rem]',
  TIMER_TEXT: 'left-[77rem] top-[33.9rem]',
  CHIPPY_IMAGE: 'left-[73.9rem]',
} as const;

const getProgressBarImage = (acornCount: number): string => {
  const progressBarImages = {
    0: progressBar0,
    1: progressBar1,
    2: progressBar2,
    3: progressBar3,
    4: progressBar4,
    5: progressBar5,
    6: progressBar6,
    7: progressBar7,
  };
  return (
    progressBarImages[acornCount as keyof typeof progressBarImages] ||
    progressBar0
  );
};

const getLevelText = (acornCount: number): string => {
  if (acornCount === 0) {
    return 'LV.1 쫄쫄 굶은 치삐';
  }
  if (acornCount <= 2) {
    return 'LV.2 배고픈 치삐';
  }
  if (acornCount <= 4) {
    return 'LV.3 출출한 치삐';
  }
  if (acornCount <= 6) {
    return 'LV.4 배부른 치삐';
  }
  return 'LV.5 행복한 치삐';
};

const bannerVariants = cva(
  'mx-auto w-[1440px] h-[40rem] relative overflow-visible',
  {
    variants: {
      acornCount: {
        0: 'bg-white',
        1: 'bg-main100',
        2: 'bg-main100',
        3: 'bg-main200',
        4: 'bg-main200',
        5: 'bg-main300',
        6: 'bg-main300',
        7: 'bg-main400',
      },
    },
    defaultVariants: {
      acornCount: 0,
    },
  }
);

export type BannerVariants = VariantProps<typeof bannerVariants>;

interface BannerProps extends BannerVariants {
  children?: React.ReactNode;
  className?: string;
  showImage?: boolean;
}

const Banner = ({
  acornCount = 0,
  children,
  className,
  showImage = true,
}: BannerProps) => {
  const progressBarImage = getProgressBarImage(acornCount ?? 0);
  const levelText = getLevelText(acornCount ?? 0);

  return (
    <div className={cn(bannerVariants({ acornCount }), className, 'relative')}>
      {acornCount === 7 && (
        <img
          src={bannerGraphic}
          alt="배너 그래픽 배경"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-cover"
          draggable="false"
        />
      )}

      <BannerHeadline acornCount={acornCount ?? 0} />

      <img
        src={progressBarImage}
        alt={`도토리 ${acornCount ?? 0}개 프로그레스 바`}
        className={`absolute ${BANNER_POSITIONS.PROGRESS_BAR} h-[6.5rem] w-[42.5rem] object-contain`}
      />

      <BannerAcornBubble count={0} position="left" />

      <BannerLevelInfo levelText={levelText} />

      <BannerAcornBubble count={7} position="right" />

      <BannerTimer acornCount={acornCount ?? 0} />

      <BannerChippyImage acornCount={acornCount ?? 0} showImage={showImage} />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Banner;
