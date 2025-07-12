import { memo, type KeyboardEvent } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@shared/utils/cn';
import { CategoryProps } from '@shared/types';

const categoryVariants = cva(
  'inline-flex justify-center items-center rounded-[50px] outline-1 outline-offset-[-1px] cursor-pointer transition-colors',
  {
    variants: {
      isActive: {
        true: 'bg-main400 outline-main400',
        false: 'bg-white outline-gray200',
      },
      hasCount: {
        true: 'pl-[2.4rem] pr-[1.6rem]',
        false: 'pl-[2.4rem] pr-[2.4rem]',
      },
    },
    defaultVariants: {
      isActive: false,
      hasCount: true,
    },
  }
);

const categoryTextVariants = cva('sub2-m tracking-tight', {
  variants: {
    isActive: {
      true: 'text-white',
      false: 'text-gray800',
    },
  },
  defaultVariants: {
    isActive: false,
  },
});

const categoryCountVariants = cva('w-[4rem] h-[4rem] rounded-[2rem] flex items-center justify-center', {
  variants: {
    isActive: {
      true: 'bg-white',
      false: 'bg-main400',
    },
  },
  defaultVariants: {
    isActive: false,
  },
});

const categoryCountTextVariants = cva('sub5-b', {
  variants: {
    isActive: {
      true: 'text-main400',
      false: 'text-white',
    },
  },
  defaultVariants: {
    isActive: false,
  },
});

export interface CategoryVariants extends VariantProps<typeof categoryVariants> {}

const Category = ({
  text,
  count,
  isActive = false,
  onClick,
  hideZeroCount = false,
}: CategoryProps) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  const shouldShowCount = !hideZeroCount || count > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(categoryVariants({ isActive, hasCount: shouldShowCount }), 'py-[1rem] gap-2.5')}
    >
      <div className="inline-flex items-center justify-start gap-5">
        <div className={cn(categoryTextVariants({ isActive }))}>{text}</div>
        {shouldShowCount && (
          <div className={cn(categoryCountVariants({ isActive }))}>
            <div className={cn(categoryCountTextVariants({ isActive }))}>{count}</div>
          </div>
        )}
      </div>
    </button>
  );
};

export default memo(Category);
