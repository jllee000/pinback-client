import { useState } from 'react';
import {
  CategoryDropDown,
  CommonBtn,
  InfoBox,
  TextArea,
  TimePicker,
  ToggleButton,
} from '@pinback/design-system/ui';
import { POP_TEXTAREA_MAX_LENGTH } from '@constants/index';
interface ModalPopProps {
  onClose: () => void;
}
const ModalPop = ({ onClose }: ModalPopProps) => {
  const [formState, setFormState] = useState({
    date: '',
    dateError: '',
    time: '',
    timeError: '',
  });
  const handleFieldChange = (
    field: 'date' | 'time',
    value: string,
    errorMessage?: string
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
      [`${field}Error`]: errorMessage ?? '',
    }));
  };

  return (
    <div className="flex h-[64.2rem] w-[38.7rem] flex-col items-center justify-between rounded-[1rem] bg-white px-[3rem] py-[3rem]">
      <div className="flex flex-col gap-[1.6rem]">
        {/* TODO : 하드코딩 데이터 구간 */}
        <InfoBox
          size="large"
          title="집에서 할 수 있는"
          location="네이버 블로그"
          icon="https://play-lh.googleusercontent.com/rdmNKWDpwdzP-UBlrKQqVWwOm0vnvXg8lOD4vRQJQm8AR2lK2BBAGbrPzlDfI9lWyQ"
        />
        <section className="mt-[0.4rem]">
          <p className="sub5-sb text-gray900 mb-[1.2rem]">카테고리</p>
          <CategoryDropDown
            size="large"
            categories={['기획', '취미', '요리']}
          />
        </section>
        <section>
          <p className="sub5-sb text-gray900 mb-[1.2rem]">메모</p>
          <TextArea
            size="large"
            maxLength={POP_TEXTAREA_MAX_LENGTH}
            placeholder="메모를 입력하고 도토리를 받아보세요!"
          />
        </section>
        <section>
          <div className="mb-[1.2rem] flex items-center justify-between">
            <p className="sub5-sb text-gray900">리마인드</p>
            <ToggleButton size="large" />
          </div>
          <div className="flex items-center justify-between">
            <TimePicker
              size="large"
              specie="date"
              value={formState.date}
              onChange={(val, err) => handleFieldChange('date', val, err)}
            />
            <TimePicker
              size="large"
              specie="time"
              value={formState.time}
              onChange={(val, err) => handleFieldChange('time', val, err)}
            />
          </div>
          {(formState.dateError || formState.timeError) && (
            <p className="body3-r text-error400 mb-[1.5rem] mt-[0.8rem]">
              {formState.dateError || formState.timeError}
            </p>
          )}
        </section>
      </div>
      <div className="flex w-full items-center justify-between gap-[2.1rem]">
        <CommonBtn
          text="삭제하기"
          size="medium"
          type="gray"
          onClick={onClose}
        />
        <CommonBtn
          text="저장하기"
          size="medium"
          type="green"
          onClick={onClose}
        />
      </div>
      {/* TODO : 하드코딩 데이터 구간 */}
    </div>
  );
};
export default ModalPop;
