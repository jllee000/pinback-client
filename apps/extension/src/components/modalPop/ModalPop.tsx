import {
  useDeleteCategories,
  useGetCategoriesDash,
  usePatchCategories,
  usePostArticles,
  usePostCategories,
} from '@api/queries';
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
import { fomatToday } from '@pinback/design-system/utils';
import { useEffect, useState } from 'react';
import { useGetRemindTime } from '../../api/modalQueries';
import ModalHeader from './ModalHeader';

interface ModalPopProps {
  urlInfo: string;
  imgInfo?: string;
  titleInfo?: string;
  desInfo?: string;
}
interface Category {
  categoryId: number;
  categoryName: string;
  unreadCount: number;
}

const ModalPop = ({ urlInfo, imgInfo, titleInfo, desInfo }: ModalPopProps) => {
  const [memo, setMemo] = useState('');
  const { mutate: postArticle } = usePostArticles();
  const { mutate: postCategories } = usePostCategories();
  const { mutate: patchCategories } = usePatchCategories();
  const { mutate: deleteCategories } = useDeleteCategories();
  const { data: categoriesData } = useGetCategoriesDash();
  const {
    data: remindTimeData,
    isLoading,
    error,
  } = useGetRemindTime(fomatToday(new Date()));
  useEffect(() => {
    if (remindTimeData?.data) {
      const { remindDate, remindTime } = remindTimeData.data;

      const formattedDate = remindDate.replace(/-/g, '');
      const formattedTime = remindTime.slice(0, 5).replace(':', '');

      setFormState((prev) => ({
        ...prev,
        date: formattedDate,
        time: formattedTime,
      }));
    }
  }, [remindTimeData]);

  const [formState, setFormState] = useState({
    date: '',
    dateError: '',
    time: '',
    timeError: '',
  });
  const [categories, setCategories] = useState(['']);

  const [categoryPopupMode, setCategoryPopupMode] = useState<
    'edit' | 'add' | 'delete' | ''
  >('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [matchId, setMatchedId] = useState<number | null>(null);
  const [editCategoryIndex, setEditCategoryIndex] = useState<number | null>(
    null
  );
  const [isAskingDelete, setIsAskingDelete] = useState(false);

  useEffect(() => {
    if (categoriesData) {
      const categoryNames: string[] = categoriesData.data.categories.map(
        (item: Category) => item.categoryName
      );
      setCategories(categoryNames);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (categoriesData?.data?.categories && selectedCategory) {
      const matched = categoriesData.data.categories.find(
        (item: Category) => item.categoryName === selectedCategory
      );
      setMatchedId(matched?.categoryId ?? null);
    }
  }, [selectedCategory, categoriesData]);

  const handlePopupClose = () => {
    setCategoryPopupMode('');
    setIsAskingDelete(false);
  };
  const handlePopupConfirm = (newCategory?: string) => {
    if (!newCategory) return;

    if (categoryPopupMode === 'add') {
      postCategories(
        { categoryName: newCategory },
        {
          onSuccess: (res) => {
            setCategories((prev) => [...prev, newCategory]);
            setSelectedCategory(newCategory);
            handlePopupClose();
          },
          onError: (err: any) => {
            const message = err?.response?.data?.message;
            alert('❌ 저장 실패:' + err.response?.data.message);
          },
        }
      );
    }
  };
  const handlePopupEdit = (newCategory?: string) => {
    if (!newCategory) return;
    if (categoryPopupMode === 'edit' && editCategoryIndex !== null) {
      setSelectedCategory(newCategory);
      handlePopupClose();

      patchCategories(
        {
          categoryId:
            categoriesData.data.categories[editCategoryIndex].categoryId,
          categoryName: newCategory,
        },
        {
          onSuccess: (res) => {
            setCategories((prev) => [...prev, newCategory]);
            setSelectedCategory(newCategory);
            location.reload();
            handlePopupClose();
          },
          onError: (err: any) => {
            const message = err?.response?.data?.message;
            alert('❌ 등록 실패:' + err.response?.data.message);
          },
        }
      );
    }
  };
  const handlePopupDelete = () => {
    setSelectedCategory('');
    if (categoryPopupMode === 'edit' && editCategoryIndex !== null) {
      handlePopupClose();
      deleteCategories(
        {
          categoryId:
            categoriesData.data.categories[editCategoryIndex].categoryId,
        },
        {
          onSuccess: (res) => {
            location.reload();
            handlePopupClose();
          },
          onError: (err: any) => {
            const message = err?.response?.data?.message;
            alert('❌ 삭제 실패:' + err.response?.data.message);
          },
        }
      );
    }
  };

  if (error) {
    console.error('Error fetching remind time:', error);
    return <div>Error loading remind time</div>;
  }

  const handleSave = () => {
    const remindTimeFormatted = `${formState.date.slice(0, 4)}-${formState.date.slice(4, 6)}-${formState.date.slice(6, 8)}T${formState.time.slice(0, 2)}:${formState.time.slice(2, 4)}:00`;

    const defaultCategoryId =
      categoriesData?.data?.categories?.[0]?.categoryId ?? null;
    const categoryIdToUse = matchId ?? defaultCategoryId;

    chrome.storage.local.set({ savedTitle: titleInfo }, () => {
      console.log('📦 storage 저장 완료:', titleInfo);
    });

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

    postArticle(
      {
        url: urlInfo,
        categoryId: categoryIdToUse,
        memo: memo,
        remindTime: remindTimeFormatted,
      },
      {
        onSuccess: (data) => {
          console.log('✅ 저장 성공:', data);
          // window.close(); // 최종 배포 시 주석 해제
        },
        onError: (error: any) => {
          const message = error?.response?.data?.message;
          alert('❌ 저장 실패:' + message);
        },
      }
    );
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

  const handleCategoryChange = (value: string, index?: number) => {
    console.log(index, value);
    if (value === 'edit') {
      setEditCategoryIndex(index ?? null);
      setSelectedCategory(value);
      setCategoryPopupMode('edit');
    } else if (value === 'create') {
      setCategoryPopupMode('add');
    } else {
      setSelectedCategory(value);
      console.log(value);
      console.log(value);
      setCategoryPopupMode('');
    }
  };

  const truncateText = (text: string, maxLength: number = 18): string =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <div className="relative flex h-[54.7rem] w-[32rem] flex-col items-center justify-between rounded-[1rem] bg-white px-[2rem] py-[2rem]">
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
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
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
          mode={isAskingDelete ? 'delete' : categoryPopupMode}
          value={categoryPopupMode === 'edit' ? selectedCategory : ''}
          onAskDeleteConfirm={() => setIsAskingDelete(true)}
          existingCategories={categories}
          onCancel={handlePopupClose}
          onEdit={handlePopupEdit}
          onConfirm={handlePopupConfirm}
          onDelete={handlePopupDelete}
        />
      )}
    </div>
  );
};

export default ModalPop;
