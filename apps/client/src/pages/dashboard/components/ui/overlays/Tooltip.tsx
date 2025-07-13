import type { ReactNode } from 'react';
import polygonSvg from '/src/assets/icons/shapes/polygon.svg';

interface TooltipProps {
  children: ReactNode;
  className?: string;
}

const Tooltip = ({ children, className = '' }: TooltipProps) => {
  return (
    <div
      className={`relative flex h-[4.8rem] w-[32.4rem] items-center ${className}`}
    >
      <img
        src={polygonSvg}
        alt="화살표"
        className="fill-main400 absolute -left-[0.6rem] top-1/2 z-0 h-[1.6rem] w-[1.964rem] -translate-y-1/2"
      />
      <div className="bg-main400 relative z-10 ml-[0.7rem] flex h-full flex-1 items-center justify-center rounded-[1rem]">
        <span className="sub5-b w-full text-center text-white">{children}</span>
      </div>
    </div>
  );
};

export default Tooltip;
