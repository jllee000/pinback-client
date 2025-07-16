import { useState, useEffect } from 'react';
import {
  CategoryDropDown,
  CommonBtn,
  InfoBox,
  TextArea,
  TimePicker,
  ToggleButton,
} from '@pinback/design-system/ui';
import ModalHeader from './ModalHeader';
import { POP_TEXTAREA_MAX_LENGTH } from '@constants/index';
import apiRequest from '../../api/axiosInstance';
const ModalPop = () => {
  const [token, setToken] = useState('');
  const [formState, setFormState] = useState({
    date: '',
    dateError: '',
    time: '',
    timeError: '',
  });

  const storeMarks = async () => {
    try {
      const response = await apiRequest.get('/api/v1/categories/dashboard', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('response: ' + JSON.stringify(response));
    } catch (error) {
      console.log('signup error: ' + JSON.stringify(error));
    }
  };

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
    <div className="flex h-[54.7rem] w-[32rem] flex-col items-center justify-between rounded-[1rem] bg-white px-[2rem] py-[2rem]">
      <div>
        <ModalHeader onClick={() => window.close()} />

        <div className="px-[1rem] pt-[1.9rem]">
          <InfoBox
            size="medium"
            title="집에서 할 수 있는"
            location="네이버 블로그"
            icon="https://play-lh.googleusercontent.com/rdmNKWDpwdzP-UBlrKQqVWwOm0vnvXg8lOD4vRQJQm8AR2lK2BBAGbrPzlDfI9lWyQ"
          />
          <div className="mt-[1.8rem] flex flex-col gap-[1.6rem]">
            <section>
              <p
                className="caption2-sb text-gray900 mb-[0.8rem]"
                onClick={storeMarks}
              >
                카테고리
              </p>
              <CategoryDropDown
                size="medium"
                categories={['기획', '취미', '요리']}
              />
            </section>
            <section>
              <p className="caption2-sb text-gray900 mb-[0.8rem]">메모</p>
              <TextArea
                size="medium"
                maxLength={POP_TEXTAREA_MAX_LENGTH}
                placeholder="메모를 입력하고 도토리를 받아보세요!"
              />
            </section>
            <section>
              <div className="mb-[0.8rem] flex items-center justify-between">
                <p className="caption2-sb text-gray900">리마인드</p>
                <ToggleButton size="medium" />
              </div>
              <div className="flex items-center justify-between">
                <TimePicker
                  size="medium"
                  specie="date"
                  value={formState.date}
                  onChange={(val, err) => handleFieldChange('date', val, err)}
                />
                <TimePicker
                  size="medium"
                  specie="time"
                  value={formState.time}
                  onChange={(val, err) => handleFieldChange('time', val, err)}
                />
              </div>
              {(formState.dateError || formState.timeError) && (
                <p className="caption1-sb text-error400 mt-[1rem]">
                  {formState.dateError || formState.timeError}
                </p>
              )}
            </section>
          </div>
        </div>
      </div>
      <CommonBtn text="저장하기" size="large" type="green" />
    </div>
  );
};
export default ModalPop;