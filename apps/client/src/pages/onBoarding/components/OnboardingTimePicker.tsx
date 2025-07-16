import { WheelPicker, WheelPickerWrapper } from '@pinback/design-system/ui';
import type { WheelPickerOption } from '@pinback/design-system/ui';
import { CommonBtn } from '@pinback/design-system/ui';
import { useState } from 'react';

interface OnBoardingTimePickerProps {
  onSave: (time: { hour: string; minute: string; meridiem: string }) => void;
  onCancel: () => void;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const OnBoardingTimePicker = ({
  onSave,
  onCancel,
  onClick,
}: OnBoardingTimePickerProps) => {
  const createArray = (length: number, add = 0): WheelPickerOption[] =>
    Array.from({ length }, (_, i) => {
      const value = i + add;
      return {
        label: value.toString().padStart(2, '0'),
        value: value.toString(),
      };
    });

  const hourOptions = createArray(12, 1);
  const minuteOptions = createArray(60);
  const meridiemOptions: WheelPickerOption[] = [
    { label: '오전', value: '오전' },
    { label: '오후', value: '오후' },
  ];

  const [selectedHour, setSelectedHour] = useState(hourOptions[0].value);
  const [selectedMinute, setSelectedMinute] = useState(minuteOptions[0].value);
  const [selectedMeridiem, setSelectedMeridiem] = useState(
    meridiemOptions[0].value
  );

  return (
    <div
      onClick={onClick}
      className="z-100 absolute top-[11.4rem] box-border flex w-[38.4rem] flex-col items-center justify-center rounded-[2rem] border bg-white px-[3rem] py-[2.1rem] shadow-[6px_11px_20px_0px_rgba(0,0,0,0.1)]"
    >
      <WheelPickerWrapper>
        <div className="box-border flex h-[16.9rem] items-center">
          <WheelPicker
            options={meridiemOptions}
            optionItemHeight={56}
            onValueChange={(value: any) => setSelectedMeridiem(value)}
          />
          <WheelPicker
            options={hourOptions}
            infinite
            visibleCount={8}
            optionItemHeight={56}
            onValueChange={(value: any) => setSelectedHour(value)}
          />
          <p className="sub3-sb flex h-[5.6rem] items-center justify-center border-y-[0.5px]">
            :
          </p>
          <WheelPicker
            options={minuteOptions}
            infinite
            visibleCount={8}
            optionItemHeight={56}
            onValueChange={(value: any) => setSelectedMinute(value)}
          />
        </div>
      </WheelPickerWrapper>

      <div className="flex w-full justify-between">
        <CommonBtn
          size="medium"
          type="gray"
          text="취소하기"
          onClick={onCancel}
        />
        <CommonBtn
          size="medium"
          type="green"
          text="저장하기"
          onClick={() =>
            onSave({
              hour: selectedHour,
              minute: selectedMinute,
              meridiem: selectedMeridiem,
            })
          }
        />
      </div>
    </div>
  );
};
export default OnBoardingTimePicker;
