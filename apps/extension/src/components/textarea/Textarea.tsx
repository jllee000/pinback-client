import * as React from 'react';
import { cn } from '@pinback/design-system/utils';

type TextareaProps = React.ComponentProps<'textarea'> & {
  size?: 'medium' | 'large';
  maxLength?: number;
};

function Textarea({ className, size = 'medium', ...props }: TextareaProps) {
  const sizeVariant = {
    medium:
      'h-[10.5rem] w-[26rem] caption2-m px-[1.4rem] py-[1.3rem] resize-none overflow-y-auto',
    large:
      'h-[14.7rem] w-[32.7rem] body2-m px-[2rem] py-[1.3rem] resize-none overflow-y-auto',
  };

  return (
    <textarea
      data-slot="textarea"
      maxLength={length}
      className={cn(
        'text-gray900 placeholder:text-gray400 border-gray100 shadow-xs field-sizing-content focus-visible:ring-main400 focus-visible:border-main400 flex w-full rounded-[1rem] border bg-white outline-none transition focus-visible:ring-[0.1rem] disabled:cursor-not-allowed disabled:opacity-50',
        sizeVariant[size],
        className
      )}
      {...props}
    />
  );
}
export { Textarea };
