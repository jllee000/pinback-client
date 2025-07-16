import Timer from '@pages/dashboard/components/ui/indicators/Timer';
import timerBubble from '@assets/banner/timer_bubble.svg';
import { MAX_ACORN_COUNT } from '@pages/dashboard/constants/levelData';

interface BannerTimerProps {
  acornCount: number;
}

const BannerTimer = ({ acornCount }: BannerTimerProps) => {
  if (acornCount !== MAX_ACORN_COUNT) {
    return null;
  }

  return (
    <>
      <img
        src={timerBubble}
        alt="타이머 버블"
        className="absolute left-[75.3rem] top-[32.8rem] z-20 object-contain"
        draggable="false"
      />

      <div className="absolute left-[77rem] top-[33.9rem] z-30 flex h-[2.4rem] w-[30rem] items-center justify-center">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="sub5-b text-gray600">
            도토리 다시 모을 수 있는 시간까지
          </span>
          <span className="sub5-b text-main400">
            <Timer />
          </span>
          <span className="sub5-b">✨</span>
        </div>
      </div>
    </>
  );
};

export default BannerTimer;
