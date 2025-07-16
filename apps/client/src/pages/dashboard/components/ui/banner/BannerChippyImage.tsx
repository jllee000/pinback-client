import { BANNER_IMAGES } from '@pages/dashboard/constants/bannerImages';

interface BannerChippyImageProps {
  acornCount: number;
  showImage?: boolean;
}

const BANNER_POSITIONS = {
  CHIPPY_IMAGE: 'left-[73.9rem]',
} as const;

const BannerChippyImage = ({
  acornCount,
  showImage = true,
}: BannerChippyImageProps) => {
  if (!showImage) {
    return null;
  }

  const safeIndex = Math.max(
    0,
    Math.min(acornCount, Object.keys(BANNER_IMAGES).length - 1)
  );
  const chippyImage = BANNER_IMAGES[safeIndex as keyof typeof BANNER_IMAGES];

  return (
    <img
      src={chippyImage}
      alt={`도토리 ${acornCount}개 - 치삐 레벨 이미지`}
      className={`absolute ${BANNER_POSITIONS.CHIPPY_IMAGE} h-[40rem] w-[59rem] object-contain`}
    />
  );
};

export default BannerChippyImage;
