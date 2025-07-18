import React, { useRef } from 'react';
import { cva } from 'class-variance-authority';
import {
  validateDate,
  validateTime,
  formatDate,
  formatTime,
} from '../../utils/pickerUtils';
export interface TimePickerProps {
  size: 'large' | 'medium';
  specie: 'date' | 'time';
  value: string;
  onChange: (value: string, errorMessage?: string) => void;
}

const wrapperSizeVariants = cva('', {
  variants: {
    size: {
      large: 'w-[15.9rem] h-[5rem]',
      medium: 'w-[12.6rem] h-[3.6rem]',
    },
  },
  defaultVariants: {
    size: 'large',
  },
});

const inputTitleVariants = cva('text-gray900', {
  variants: {
    size: {
      large: 'sub5-sb text-[1.6rem]',
      medium: 'caption2-sb text-[1.2rem]',
    },
  },
  defaultVariants: {
    size: 'large',
  },
});

const inputVariants = cva(
  'font-pretendard w-[60%] outline-none font-medium not-italic text-gray600 leading-[150%] tracking-[-0.016rem]',
  {
    variants: {
      size: {
        large: 'body2-m text-[1.6rem]',
        medium: 'caption2-m text-[1.2rem]',
      },
    },
    defaultVariants: {
      size: 'large',
    },
  }
);

const TimePicker = ({ size, specie, value, onChange }: TimePickerProps) => {
  const isDeletingRef = useRef(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    isDeletingRef.current = e.key === 'Backspace';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const onlyDigits = raw.replace(/\D/g, ''); // 숫자만 남기기

    if (isDeletingRef.current) {
      onChange(onlyDigits);
      return;
    }

    if (specie === 'date') {
      const formatted = formatDate(onlyDigits);
      const errorMsg = validateDate(onlyDigits);
      onChange(onlyDigits, errorMsg ?? undefined);
      console.log(formatted);
    } else {
      const formatted = formatTime(onlyDigits);
      const errorMsg = validateTime(onlyDigits);
      onChange(onlyDigits, errorMsg ?? undefined);
      console.log(formatted);
    }
  };

  const displayValue =
    specie === 'time'
      ? formatDisplayTime(value) // 우리가 만들 함수
      : formatDisplayDate(value); // ex: 20250719 → 2025-07-19
  function formatDisplayTime(raw: string): string {
    if (raw.length !== 4) {
      return raw;
    }
    const hour = parseInt(raw.slice(0, 2), 10);
    const minute = raw.slice(2);
    const period = hour < 12 ? '오전' : '오후';
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;

    return `${period} ${String(hour12).padStart(2, '0')}:${minute}`;
  }
  function formatDisplayDate(raw: string): string {
    if (raw.length !== 8) {
      return raw;
    }
    return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
  }

  return (
    <div>
      <div
        className={`flex ${wrapperSizeVariants({ size })} items-center gap-[1.3rem] rounded-[1rem] border border-gray-100 bg-white py-[1.3rem] pl-[1.4rem]`}
      >
        <label
          htmlFor={`${specie}-picker`}
          className={inputTitleVariants({ size })}
        >
          {specie === 'date' ? '날짜' : '시간'}
        </label>
        <input
          id={`${specie}-picker`}
          // value={value}
          value={displayValue}
          type="text"
          inputMode="numeric"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          className={inputVariants({ size })}
        />
      </div>
    </div>
  );
};

export default TimePicker;
