import { cva } from 'class-variance-authority';

interface CommonBtnProps {
  size: 'large' | 'medium' | 'small' | 'Xsmall';
  type: 'green' | 'gray' | 'white';
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const sizeVariants = cva(
  'rounded-[0.8rem] text-center font-semibold leading-normal w-full',
  {
    variants: {
      size: {
        large: 'h-[4.5rem] py-[1.2rem] text-[1.4rem]',
        medium: 'h-[5.9rem] py-[1.6rem] text-[1.8rem]',
        small: 'h-[4.2rem] text-[1.4rem]',
        Xsmall: 'h-[4.0rem] text-[1.4rem]',
      },
    },
    defaultVariants: {
      size: 'large',
    },
  }
);

const colorVariants = cva('', {
  variants: {
    type: {
      green: 'bg-main400 text-white',
      gray: 'bg-gray0 text-gray700',
      white: 'bg-white text-gray800 border border-gray100',
    },
  },
  defaultVariants: {
    type: 'green',
  },
});

const CommonBtn = ({
  size,
  type,
  text,
  onClick,
  disabled = false,
}: CommonBtnProps) => {
  const baseClass = sizeVariants({ size });

  const finalClass = disabled
    ? `bg-gray200 text-white cursor-not-allowed pointer-events-none ${baseClass}`
    : `${colorVariants({ type })} ${baseClass}`;

  return (
    <button
      className={finalClass}
      onClick={disabled ? undefined : onClick}
      type="button"
      aria-label="공통 버튼"
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default CommonBtn;
