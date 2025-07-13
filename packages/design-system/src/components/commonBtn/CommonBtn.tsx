import { cva } from 'class-variance-authority';
interface CommonBtnProps {
  size: 'large' | 'medium' | 'small';
  type: 'green' | 'gray' | 'white';
  text: string;
  onClick?: () => void;
}
const colorVariants = cva('', {
  variants: {
    type: {
      green: 'bg-main400  text-white',
      gray: 'bg-gray0 text-gray700',
      white: 'bg-white text-gray800 border border-gray100',
    },
  },
  defaultVariants: {
    type: 'green',
  },
});
const sizeVariants = cva(
  'rounded-[0.8rem] text-center font-semibold leading-normal ',
  {
    variants: {
      size: {
        large: 'w-[26rem] h-[4.5rem] py-[1.2rem] text-[1.4rem]  ',
        medium: 'w-[15.3rem] h-[5.9rem] py-[1.6rem] text-[1.8rem] ',
        small: 'w-[10.2rem] h-[4.2rem] text-[1.4rem] ',
      },
    },
    defaultVariants: {
      size: 'large',
    },
  }
);
const CommonBtn = ({ size, type, text, onClick }: CommonBtnProps) => {
  return (
    <button
      className={`${sizeVariants({ size })} ${colorVariants({ type })}`}
      onClick={onClick}
      type="button"
    >
      {text}
    </button>
  );
};
export default CommonBtn;
