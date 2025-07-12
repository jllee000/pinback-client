import errorIcon from '@/icons/source/ic_error.svg';
import { cva } from 'class-variance-authority';
import { InputHTMLAttributes, Ref } from 'react';
import { cn } from '../../lib';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref: Ref<HTMLInputElement>;
  isError?: boolean;
  helperText?: string;
}

const inputBorderVariants = cva(
  'w-full rounded-[6px] border caption2-m px-[1.4rem] py-[1.2rem] transition-colors',
  {
    variants: {
      isError: {
        true: 'border-error400 focus-within:border-error400',
        false: 'border-gray100 focus-within:border-main400',
      },
    },
    defaultVariants: {
      isError: false,
    },
  }
);

const Input = ({
  ref,
  isError,
  className,
  helperText,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-[0.6rem]">
      <div className={cn(inputBorderVariants({ isError }), className)}>
        <input
          ref={ref}
          className="caption2-m placeholder-gray300 w-full focus:outline-none"
          aria-invalid={isError}
          {...props}
        />
      </div>

      {isError && helperText && (
        <div className="flex items-center gap-[0.2rem]">
          <img
            src={errorIcon}
            alt="error 아이콘"
            className="h-[1.6rem] w-[1.6rem]"
          />
          <p className="text-error400 caption2-m">{helperText}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
