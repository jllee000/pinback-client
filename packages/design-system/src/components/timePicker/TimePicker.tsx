import React, { useRef } from 'react';
import {
  verificateDate,
  formatDate,
  formatTime,
} from '../../utils/pickerUtils';
import { DATE_INPUT_LENGTH, TIME_INPUT_LENGTH } from '../../constants/index';
export interface TimePickerProps {
  specie: 'date' | 'time';
  value: string;
  onChange: (value: string) => void;
}

const TimePicker = ({ specie, value, onChange }: TimePickerProps) => {
  const isDeletingRef = useRef(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    isDeletingRef.current = e.key === 'Backspace';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    const digitsOnly = raw.replace(/\D/g, '');

    if (isDeletingRef.current) {
      onChange(digitsOnly);
      return;
    }

    if (specie === 'date') {
      if (digitsOnly.length === DATE_INPUT_LENGTH) {
        const isValid = verificateDate(digitsOnly);
        if (!isValid) {
          return;
        }
      }

      onChange(formatDate(digitsOnly));
    } else {
      if (digitsOnly.length < TIME_INPUT_LENGTH) {
        onChange(digitsOnly);
      } else {
        onChange(formatTime(digitsOnly));
      }
    }
  };

  return (
    <div>
      <div className="flex h-[5rem] w-[15.9rem] items-center gap-[1.3rem] rounded-[1rem] border border-gray-100 bg-white px-[1.4rem] py-[1.3rem]">
        <label htmlFor={`${specie}-picker`} className="sub5-sb text-black">
          {specie === 'date' ? '날짜' : '시간'}
        </label>
        <input
          id={`${specie}-picker`}
          value={value}
          type="text"
          inputMode="numeric"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          className="font-pretendard w-[8.5rem] text-[1.6rem] font-medium not-italic leading-[150%] tracking-[-0.016rem] text-gray-600"
        />
      </div>
    </div>
  );
};

export default TimePicker;
