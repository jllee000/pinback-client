import { cva } from 'class-variance-authority';
import { InputHTMLAttributes, Ref } from 'react';
import { cn } from '../../lib';
import { Icon } from '@pinback/design-system/icons';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref: Ref<HTMLInputElement>;
  isError?: boolean;
  helperText?: string;
}

const inputBorderVariants = cva(
  'w-full rounded-[0.6rem] border caption2-m px-[1.4rem] py-[1.2rem] transition-colors',
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
        {/* TODO: font token 적용 */}
        <input
          ref={ref}
          className="placeholder-gray300 w-full text-[1.2rem] font-medium focus:outline-none"
          aria-invalid={isError}
          {...props}
        />
      </div>

      {isError && helperText && (
        <div className="flex items-center gap-[0.2rem]">
          <Icon name="ic_error" width={16} height={16} color="error400" />
          <p className="text-error400 caption2-m">{helperText}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
