import { ReactNode } from 'react';
import { cva } from 'class-variance-authority';

type FontSizeType = 'lg' | 'm';
type ColorVariant = 'main400' | 'black' | 'white';

interface ButtonProps {
  text: string;
  icon?: ReactNode;
  color?: ColorVariant;
  width?: number | string;
  height?: number | string;
  fontSize?: FontSizeType;
  onClick?: () => void;
}

const fontSizeVariants = cva('', {
  variants: {
    fontSize: {
      lg: 'head2',
      m: 'sub3-sb',
    },
  },
  defaultVariants: {
    fontSize: 'm',
  },
});

const buttonVariants = cva(
  'flex items-center justify-center gap-2 rounded-full font-bold transition',
  {
    variants: {
      color: {
        main400: 'bg-main400 text-white hover:opacity-90',
        black: 'bg-gray700 text-white hover:opacity-90',
        white: 'bg-white text-main400 border border-main400 hover:bg-main100',
      },
    },
    defaultVariants: {
      color: 'main400',
    },
  }
);

const Button = ({
  text,
  icon,
  color = 'main400',
  width = 160,
  height = 48,
  fontSize = 'm',
  onClick,
}: ButtonProps) => {
  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={buttonVariants({ color })}
      style={style}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <p className={fontSizeVariants({ fontSize })}>{text}</p>
    </button>
  );
};

export default Button;
