import acornCountBubble from '@assets/banner/acorn-count-bubble.svg';

interface BannerAcornBubbleProps {
  count: number;
  position: 'left' | 'right';
}

const BannerAcornBubble = ({ count, position }: BannerAcornBubbleProps) => {
  const getPositionClasses = () => {
    if (position === 'left') {
      return 'left-[9.8rem] top-[29.5rem]';
    }
    return 'left-[49.6rem] top-[29.5rem]';
  };

  return (
    <div className={`absolute ${getPositionClasses()} z-20`}>
      <img
        src={acornCountBubble}
        alt="도토리 개수 말풍선"
        className="h-[3.7rem] w-[5.8rem] object-contain"
      />
      <div className="body2-m text-gray800 absolute inset-0 flex items-center justify-center pt-[0.4rem]">
        <span>{count}개</span>
      </div>
    </div>
  );
};

export default BannerAcornBubble;
