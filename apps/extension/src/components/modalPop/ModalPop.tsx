import { useState } from 'react';
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
import { TextFieldPopup } from '@pinback/design-system/ui';

interface ModalPopProps {
  urlInfo: string;
  imgInfo?: string;
  titleInfo?: string;
  desInfo?: string;
}

const ModalPop = ({ urlInfo, imgInfo, titleInfo, desInfo }: ModalPopProps) => {
  const [formState, setFormState] = useState({
    date: '',
    dateError: '',
    time: '',
    timeError: '',
  });

  const [categoryPopupMode, setCategoryPopupMode] = useState<
    'edit' | 'add' | ''
  >('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState(['기획', '취미', '요리']);

  const handleSave = () => {
    chrome.runtime.sendMessage(
      {
        type: 'SAVE_BOOKMARK',
        payload: {
          url: urlInfo,
          title: '저장할 페이지 이름',
        },
      },
      (response) => {
        console.log('✅ 응답 받음:', response);
      }
    );
    window.close();
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

  const handleCategoryChange = (value: string) => {
    if (value === 'edit') {
      setCategoryPopupMode('edit');
    } else if (value === 'create') {
      setCategoryPopupMode('add');
    } else {
      setSelectedCategory(value);
      setCategoryPopupMode('');
    }
  };

  const handlePopupClose = () => {
    setCategoryPopupMode('');
  };

  const handlePopupConfirm = (newCategory?: string) => {
    if (!newCategory) return;
    if (categoryPopupMode === 'add') {
      setCategories((prev) => [...prev, newCategory]);
      setSelectedCategory(newCategory);
    } else if (categoryPopupMode === 'edit') {
      setCategories((prev) =>
        prev.map((cat) => (cat === selectedCategory ? newCategory : cat))
      );
      setSelectedCategory(newCategory);
    }
    handlePopupClose();
  };

  const truncateText = (text: string, maxLength: number = 18): string =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <div className="flex h-[54.7rem] w-[32rem] flex-col items-center justify-between rounded-[1rem] bg-white px-[2rem] py-[2rem]">
      <div>
        <ModalHeader onClick={() => window.close()} />
        <div className="px-[1rem] pt-[1.9rem]">
          <InfoBox
            size="medium"
            title={titleInfo ? truncateText(titleInfo) : ''}
            location={desInfo ? truncateText(desInfo) : ''}
            icon={imgInfo}
          />
          <div className="mt-[1.8rem] flex flex-col gap-[1.6rem]">
            <section>
              <p className="caption2-sb text-gray900 mb-[0.8rem]">카테고리</p>
              <CategoryDropDown
                size="medium"
                categories={categories}
                onSelect={handleCategoryChange}
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

      <CommonBtn
        text="저장하기"
        size="large"
        type="green"
        onClick={handleSave}
      />

      {categoryPopupMode && (
        <TextFieldPopup
          mode={categoryPopupMode}
          value={categoryPopupMode === 'edit' ? selectedCategory : ''}
          existingCategories={categories}
          onCancel={handlePopupClose}
          onConfirm={handlePopupConfirm}
          onDelete={() => {
            setCategories((prev) =>
              prev.filter((cat) => cat !== selectedCategory)
            );
            setSelectedCategory('');
            handlePopupClose();
          }}
        />
      )}
    </div>
  );
};

export default ModalPop;
