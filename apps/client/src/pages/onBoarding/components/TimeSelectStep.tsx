import { STEP } from '@pages/onBoarding/types';
import { Icon } from '@pinback/design-system/icons';
import { useState } from 'react';

interface TimeSelectStepProps {
  setStep: (step: string) => void;
}

const TimeSelectStep = ({ setStep }: TimeSelectStepProps) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupToggle = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime((prev) => (prev === time ? null : time));
  };

  return (
    <div className="mt-[14.9rem] flex flex-col items-center gap-[16.1rem]">
      <div className="flex flex-col items-center gap-[1.2rem]">
        <p className="head1">도토리를 찾으러 갈 시간을 정해볼까요?</p>
        <p className="sub4-sb text-gray800">
          선택하신 시간에 매일 저장한 북마크 리마인드를 보내드려요
        </p>
      </div>

      <div className="flex gap-[2.4rem]">
        {/* 아침형 치삐 */}
        <button
          onClick={() => handleTimeSelect('morning')}
          className={`flex h-[10rem] w-[38.4rem] cursor-pointer flex-col items-center justify-center gap-[0.6rem] rounded-[20px] border-[2px] p-[2rem] ${
            selectedTime === 'morning' ? 'border-main400' : 'border-gray-300'
          }`}
        >
          <p
            className={`head3 ${selectedTime === 'morning' ? 'text-main400' : 'text-gray700'}`}
          >
            아침형 치삐
          </p>
          <p
            className={`sub3-sb ${selectedTime === 'morning' ? 'text-main400' : 'text-gray500'}`}
          >
            오전 9시
          </p>
        </button>

        {/* 저녁형 치삐 */}
        <button
          onClick={() => handleTimeSelect('evening')}
          className={`flex h-[10rem] w-[38.4rem] cursor-pointer flex-col items-center justify-center gap-[0.6rem] rounded-[20px] border-[2px] p-[2rem] ${
            selectedTime === 'evening' ? 'border-main400' : 'border-gray-300'
          }`}
        >
          <p
            className={`head3 ${selectedTime === 'evening' ? 'text-main400' : 'text-gray700'}`}
          >
            저녁형 치삐
          </p>
          <p
            className={`sub3-sb ${selectedTime === 'evening' ? 'text-main400' : 'text-gray500'}`}
          >
            오후 8시
          </p>
        </button>

        {/* 사용자 설정 (선택 불가능) */}
        <div
          onClick={handlePopupToggle}
          className={`relative flex h-[10rem] w-[38.4rem] cursor-pointer items-center justify-center gap-[0.6rem] rounded-[20px] border-[2px] ${
            isPopupOpen ? 'border-main400' : 'border-gray-300'
          } p-[2rem]`}
        >
          <p
            className={`head3 ${isPopupOpen ? 'text-main400' : 'text-gray700'}`}
          >
            사용자 설정
          </p>
          <Icon
            name="ic_arrow_down"
            width={24}
            height={24}
            color={isPopupOpen ? 'main400' : 'gray700'}
          />
          {isPopupOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute top-[12.9rem] h-[30rem] w-[38.4rem] rounded-[20px] bg-white p-[2rem] shadow-[6px_11px_20px_0px_rgba(0,0,0,0.10)]"
            >
              <p className="sub3-sb text-gray700">구현 예정 기능...</p>
            </div>
          )}
        </div>
      </div>
      {/* TODO: button 태그 token 적용 이슈로 임시 div 사용 -> button 교체 */}
      <div
        onClick={() => setStep(STEP.WELCOME)}
        className="bg-main300 sub3-sb flex h-[5.8rem] w-[13.7rem] items-center justify-center self-end rounded-[30px] text-white"
      >
        다음
      </div>
    </div>
  );
};

export default TimeSelectStep;
