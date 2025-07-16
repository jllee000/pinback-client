interface BannerHeadlineProps {
  acornCount: number;
}

const getHeadlineText = (acornCount: number): string[] => {
  if (acornCount === 0) {
    return ['0개??', '나 도토리 맛만 보면 안 되나...'];
  }
  if (acornCount <= 2) {
    return ['도토리 먹고 싶다고 했다이가', '...'];
  }
  if (acornCount <= 4) {
    return ['도토리 더 안 주나...', '나 배고픈디'];
  }
  if (acornCount <= 6) {
    return ['니 쫌 하는데?', '내 뽀뽀 받아라'];
  }
  return ['니 대박인데?', '내 배불러 죽겠다'];
};

const BANNER_POSITIONS = {
  HEADLINE: 'left-[12rem] top-[6.3rem]',
} as const;

const BannerHeadline = ({ acornCount }: BannerHeadlineProps) => {
  const headlineText = getHeadlineText(acornCount);
  const textColor = acornCount === 7 ? 'text-white' : 'text-gray800';

  return (
    <div className={`absolute ${BANNER_POSITIONS.HEADLINE} z-20 text-left`}>
      <div className={`head1 ${textColor}`}>
        {headlineText.map((text, index) => (
          <span key={index}>
            {text}
            {index < headlineText.length - 1 && <br />}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BannerHeadline;
