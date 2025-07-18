import {
  useGetArticleDetail,
  useGetModalCategories,
} from '@/pages/dashboard/apis/query/article';
import { fetchOGData } from '@/shared/utils/ogImage';
import { POP_TEXTAREA_MAX_LENGTH } from '@constants/index';
import {
  CategoryDropDown,
  CommonBtn,
  InfoBox,
  TextArea,
  TextFieldPopup,
  TimePicker,
  ToggleButton,
} from '@pinback/design-system/ui';
import {
  formatDate,
  formatTime,
} from 'node_modules/@pinback/design-system/src/utils/pickerUtils';
import { useEffect, useState } from 'react';
interface Category {
  categoryId: number;
  categoryName: string;
  unreadCount: number;
}
interface ModalPopProps {
  onClose: () => void;
  onDelete: () => void;
  selectedArticleId: number | null;
}

const ModalPop = ({ onClose, onDelete, selectedArticleId }: ModalPopProps) => {
  const [formState, setFormState] = useState({
    date: '',
    dateError: '',
    time: '',
    timeError: '',
  });
  const [categoryPopupMode, setCategoryPopupMode] = useState<
    'edit' | 'add' | ''
  >('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { data: modalCategories } = useGetModalCategories(); // 모달 카테고리 전체 조회
  const { data: articleDetail } = useGetArticleDetail(selectedArticleId); // 아티클 상세 조회
  const [matchId, setMatchedId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  console.log('matchId', matchId); // TODO: 일단 안 쓰는데 재림쓰 필요할 거 같아서 남김ㅎ

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
    if (!newCategory) {
      return;
    }
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

  useEffect(() => {
    if (modalCategories) {
      const categoryNames: string[] = modalCategories.data.categories.map(
        (item: Category) => item.categoryName
      );
      setCategories(categoryNames);
    }
  }, [modalCategories]);

  useEffect(() => {
    if (modalCategories?.data?.categories && selectedCategory) {
      const matched = modalCategories.data.categories.find(
        (item: Category) => item.categoryName === selectedCategory
      );
      setMatchedId(matched?.categoryId ?? null);
    }
  }, [selectedCategory, modalCategories]);

  useEffect(() => {
    const test = async () => {
      if (articleDetail) {
        const rawDate = articleDetail.remindAt.slice(0, 10).replace(/-/g, '');
        const rawTime = articleDetail.remindAt.slice(11, 16).replace(':', '');

        const formattedDate = formatDate(rawDate);
        const formattedTime = formatTime(rawTime);

        setFormState((prev) => ({
          ...prev,
          date: formattedDate,
          time: formattedTime,
        }));
        const og = await fetchOGData(articleDetail.url);
        setTitle(og.title || '');
        setDescription(og.siteName || '');
        setImage(og.image || '');
      }
    };

    test();
  }, [articleDetail]);

  return (
    <div className="relative flex h-[64.2rem] w-[38.7rem] flex-col items-center justify-between rounded-[1rem] bg-white px-[3rem] py-[3rem]">
      <div className="flex flex-col gap-[1.6rem]">
        {/* TODO : 하드코딩 데이터 구간 */}
        <InfoBox
          size="large"
          title={title || '임시 제목'}
          location={description || '임시 사이트 이름'}
          icon={image || ''}
        />
        <section className="mt-[0.4rem]">
          <p className="sub5-sb text-gray900 mb-[1.2rem]">카테고리</p>
          <CategoryDropDown
            size="large"
            categories={categories}
            onSelect={handleCategoryChange}
          />
        </section>
        <section>
          <p className="sub5-sb text-gray900 mb-[1.2rem]">메모</p>
          <TextArea
            defaultValue={articleDetail?.memo}
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
          onClick={() => {
            onDelete();
            onClose();
          }}
        />
        <CommonBtn
          text="저장하기"
          size="medium"
          type="green"
          onClick={onClose}
        />
      </div>
      {/* TODO : 하드코딩 데이터 구간 */}

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
