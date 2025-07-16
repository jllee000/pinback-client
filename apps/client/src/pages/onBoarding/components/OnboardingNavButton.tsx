// components/OnboardingNavButton.tsx
import { cn } from '@pinback/design-system/utils';
import { Icon } from '@pinback/design-system/icons';

interface OnboardingNavButtonProps {
  direction: 'next' | 'prev';
  disabled?: boolean;
  onClick?: () => void;
  label?: string;
}

const OnboardingNavButton = ({
  direction,
  disabled = false,
  onClick,
  label,
}: OnboardingNavButtonProps) => {
  const isNext = direction === 'next';

  const text = label || (isNext ? '다음' : '이전');

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center justify-center gap-2 rounded-[3rem] px-6 py-2 text-white transition',
        'h-[5.8rem] w-[13.7rem]',
        disabled
          ? 'bg-gray200 cursor-not-allowed text-white'
          : isNext
            ? 'bg-main300 hover:bg-main400'
            : 'bg-gray300 hover:bg-gray400 text-white'
      )}
    >
      {!isNext && (
        <Icon
          name="ic_arrow_right"
          width={24}
          height={24}
          color="white"
          className="rotate-180"
        />
      )}
      <span className="sub3-sb">{text}</span>
      {isNext && (
        <Icon name="ic_arrow_right" width={24} height={24} color="white" />
      )}
    </button>
  );
};

export default OnboardingNavButton;
