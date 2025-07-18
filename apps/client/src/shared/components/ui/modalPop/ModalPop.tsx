import {
  useGetArticleDetail,
  useGetModalCategories,
} from '@/pages/dashboard/apis/query/article';
import {
  usePatchCategories,
  useDeleteCategories,
  usePatchArticles,
  usePostCategories,
} from '@/pages/dashboard/apis/query/category';
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
  const [memo, setMemo] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const { data: modalCategories } = useGetModalCategories(); // 모달 카테고리 전체 조회
  const { data: articleDetail } = useGetArticleDetail(selectedArticleId); // 아티클 상세 조회
  const { mutate: patchCategories } = usePatchCategories(); // 카테고리 수정
  const { mutate: deleteCategories } = useDeleteCategories(); // 카테고리 삭제
  const { mutate: postCategories } = usePostCategories();
  const [matchId, setMatchedId] = useState<number | null>(null);
  const [editCategoryIndex, setEditCategoryIndex] = useState<number | null>(
    null
  );
  const { mutate: patchArticle } = usePatchArticles();
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [articleId, setArticleId] = useState(0);

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
    if (value === 'edit') {
      setEditCategoryIndex(index ?? null);
      setSelectedCategory(value);
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
      postCategories(
        { categoryName: newCategory },
        {
          onSuccess: () => {
            setCategories((prev) => [...prev, newCategory]);
            setSelectedCategory(newCategory);
            handlePopupClose();
          },
          onError: (err: any) => {
            console.log(err);
          },
        }
      );
    } else if (categoryPopupMode === 'edit') {
      setCategories((prev) =>
        prev.map((cat) => (cat === selectedCategory ? newCategory : cat))
      );
      setSelectedCategory(newCategory);
    }
    handlePopupClose();
  };

  const handlePopupEdit = (newCategory?: string) => {
    if (!newCategory) {
      return;
    }
    if (categoryPopupMode === 'edit' && editCategoryIndex !== null) {
      setSelectedCategory(newCategory);
      handlePopupClose();

      patchCategories(
        {
          categoryId:
            modalCategories.data.categories[editCategoryIndex].categoryId,
          categoryName: newCategory,
        },
        {
          onSuccess: () => {
            setCategories((prev) => [...prev, newCategory]);
            setSelectedCategory(newCategory);
            location.reload();
            handlePopupClose();
          },
          onError: (err: Error) => {
            console.log(err);
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
            modalCategories.data.categories[editCategoryIndex].categoryId,
        },
        {
          onSuccess: () => {
            location.reload();
            handlePopupClose();
          },
          onError: (err: any) => {
            console.error(err);
          },
        }
      );
    }
  };
  const handleSave = () => {
    const defaultCategoryId =
      modalCategories?.data?.categories?.[0]?.categoryId ?? null;
    const categoryIdToUse = matchId ?? defaultCategoryId;
    const formatTime24 = (raw: string): string => {
      const [period, time] = raw.split(' ');
      const [hourStr, minuteStr] = time.split(':');
      let hour = Number(hourStr);
      const minute = Number(minuteStr);

      if (period === '오후' && hour !== 12) {
        hour += 12;
      }
      if (period === '오전' && hour === 12) {
        hour = 0;
      }

      return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    };

    const formattedTime = formatTime24(formState.time);
    const formattedDate = formState.date.replace(/\./g, '-');
    const remindTime = `${formattedDate}T${formattedTime}:00`;
    const remindTimeFormatted = remindTime;

    patchArticle(
      {
        articleId: articleId,
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
        const actualUrl = articleDetail?.url ?? '';
        const actualArticeId = articleDetail?.articleId ?? '';
        setArticleId(actualArticeId);
        setUrl(actualUrl || '');
        setTitle(og.title || '');
        setDescription(og.siteName || '');
        setImage(og.image || '');
      }
    };

    test();
  }, [articleDetail, url]);

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
            value={memo}
            maxLength={POP_TEXTAREA_MAX_LENGTH}
            placeholder="메모를 입력하고 도토리를 받아보세요!"
            onChange={(e) => setMemo(e.target.value)}
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
          onClick={() => {
            handleSave();
            onClose();
          }}
        />
      </div>

      {categoryPopupMode && (
        <TextFieldPopup
          mode={categoryPopupMode}
          value={categoryPopupMode === 'edit' ? selectedCategory : ''}
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
