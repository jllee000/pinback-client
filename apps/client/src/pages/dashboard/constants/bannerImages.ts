import chippyStage0 from '@assets/banner/chippy-stages/0_쫄쫄 굶은 치삐.svg';
import chippyStage1 from '@assets/banner/chippy-stages/1_쫄쫄 굶은 치삐.svg';
import chippyStage2 from '@assets/banner/chippy-stages/2_배고픈 치삐.svg';
import chippyStage3 from '@assets/banner/chippy-stages/3_출출한 치삐.svg';
import chippyStage4 from '@assets/banner/chippy-stages/4_출출한 치삐.svg';
import chippyStage5 from '@assets/banner/chippy-stages/5_출출한 치삐.svg';
import chippyStage6 from '@assets/banner/chippy-stages/6_출출한 치삐.svg';
import chippyStage7 from '@assets/banner/chippy-stages/7_행복한 치삐.svg';

export const BANNER_IMAGES = {
  0: chippyStage0,
  1: chippyStage1,
  2: chippyStage2,
  3: chippyStage3,
  4: chippyStage4,
  5: chippyStage5,
  6: chippyStage6,
  7: chippyStage7,
} as const;

export type BannerStage = keyof typeof BANNER_IMAGES;
