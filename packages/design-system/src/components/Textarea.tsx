import * as React from 'react';
import { cn } from '../lib/utils';

type TextareaProps = React.ComponentProps<'textarea'> & {
  size?: 'medium' | 'large';
};

function Textarea({ className, size = 'medium', ...props }: TextareaProps) {
  const sizeClasses = {
    medium:
      'h-[10rem] caption2-m px-[1.2rem] py-[1rem] resize-none overflow-y-auto',
    large:
      'h-[15rem] body2-m px-[1.6rem] py-[1.2rem] resize-none overflow-y-auto',
  };

  return (
    <textarea
      data-slot="textarea"
      maxLength={1000}
      className={cn(
        'text-gray900 placeholder:text-gray400 border-gray100 shadow-xs field-sizing-content focus-visible:ring-main400 focus-visible:border-main400 flex w-full rounded-[1rem] border bg-white outline-none transition focus-visible:ring-[0.1rem] disabled:cursor-not-allowed disabled:opacity-50',
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
export { Textarea };
