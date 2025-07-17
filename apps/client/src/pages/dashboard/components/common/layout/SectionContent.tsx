import { useState } from 'react';
import type { SectionContentProps } from '@pages/dashboard/types/components';
import Timer from '@pages/dashboard/components/ui/indicators/Timer';
import gray500 from '@assets/icons/ui/gray-circle.svg';
import Tooltip from '@pages/dashboard/components/ui/overlays/Tooltip';
import { TOOLTIP_MESSAGES } from '@pages/dashboard/constants/tooltipMessages';

const SectionContent = ({
  text = '안에 데일리 리마인드를 확인해 보세요',
  onComplete,
}: SectionContentProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  return (
    <div className="text-gray400 sub3-m relative flex items-center justify-start">
      <Timer onComplete={onComplete} />
      <span className="ml-1">{text}</span>
      <div
        className="relative flex items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={gray500}
          alt="정보"
          className="ml-[0.2rem] h-[2.4rem] w-[2.4rem]"
        />
        {showTooltip && (
          <div className="absolute left-full top-1/2 z-10 ml-[0.8rem] -translate-y-1/2 transform">
            <Tooltip>{TOOLTIP_MESSAGES.dailyReminder.timeLimit}</Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionContent;
