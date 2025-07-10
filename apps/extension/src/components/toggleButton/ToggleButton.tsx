import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@pinback/design-system/utils';

type ToggleButtonProps = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: 'large' | 'medium';
};

function ToggleButton({
  className,
  size = 'large',
  ...props
}: ToggleButtonProps) {
  const sizeClasses = {
    large: {
      root: 'h-[2.4rem] w-[4.2rem]',
      thumb:
        'size-[1.8rem] data-[state=checked]:translate-x-[2rem] data-[state=unchecked]:translate-x-[0.3rem]',
    },
    medium: {
      root: 'h-[1.6rem] w-[2.8rem]',
      thumb:
        'size-[1.2rem] data-[state=checked]:translate-x-[1.3rem] data-[state=unchecked]:translate-x-[0.1rem]',
    },
  };

  const selectedSize = sizeClasses[size as 'large' | 'medium'];

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'bg-input focus-visible:ring-main400 data-[state=checked]:bg-main400 data-[state=unchecked]:bg-gray200 peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        selectedSize.root,
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none block rounded-full bg-white shadow-sm ring-0 transition-transform duration-200',
          selectedSize.thumb
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { ToggleButton };
