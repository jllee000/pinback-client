import { Icon } from '@pinback/design-system/icons';
import { CommonBtn, Input } from '@pinback/design-system/ui';
import { useRef, useState } from 'react';

type Mode = 'add' | 'edit' | 'delete';

interface TextfieldPopupProps {
  mode: Mode;
  value?: string;
  existingCategories?: string[];
  onCancel?: () => void;
  onEdit?: (value?: string) => void;
  onConfirm?: (value?: string) => void;
  onDelete?: (value?: string) => void;
  onAskDeleteConfirm?: () => void;
}

const TextfieldPopup = ({
  mode,
  value = '',
  existingCategories = [],
  onCancel,
  onConfirm,
  onDelete,
  onEdit,
  onAskDeleteConfirm,
}: TextfieldPopupProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInput = () => {
    const val = inputRef.current?.value.trim() ?? '';
    setIsButtonDisabled(val === '');
  };

  const getInputValue = () => inputRef.current?.value.trim() ?? '';

  const validate = () => {
    const input = getInputValue();

    if (input.length > 10) {
      setIsError(true);
      setHelperText('10자 이하로 입력해주세요');
      return false;
    }

    const isSameAsInitial = input === value.trim();
    const isDuplicate = existingCategories.includes(input);

    if (!isSameAsInitial && isDuplicate) {
      setIsError(true);
      setHelperText('이미 존재하는 카테고리에요');
      return false;
    }

    setIsError(false);
    setHelperText('');
    return true;
  };

  const handleConfirm = () => {
    if (validate()) {
      onConfirm?.(getInputValue());
    }
  };
  const handleEdit = () => {
    if (validate()) {
      onEdit?.(getInputValue());
    }
  };
  const handleDelete = () => {
    onAskDeleteConfirm?.();
    if (validate()) {
      onDelete?.(getInputValue());
    }
  };
  const renderForm = (heading: string, showDelete?: boolean) => (
    <div className="relative flex flex-col gap-[1.6rem]">
      {mode === 'edit' && (
        <Icon
          name="close-button"
          width={24}
          height={24}
          className="absolute right-0 top-0 cursor-pointer"
          onClick={onCancel}
        />
      )}
      <p className="sub7-sb text-center text-gray-900">{heading}</p>
      <Input
        ref={inputRef}
        defaultValue={value}
        placeholder="카테고리 이름 입력"
        isError={isError}
        helperText={helperText}
        onInput={handleInput}
      />
      <div className="flex justify-between gap-[1.6rem]">
        {showDelete ? (
          <>
            <CommonBtn
              size="Xsmall"
              type="white"
              text="삭제"
              onClick={handleDelete}
            />
            <CommonBtn
              size="Xsmall"
              type="green"
              disabled={isButtonDisabled}
              text="수정"
              onClick={handleEdit}
            />
          </>
        ) : (
          <>
            <CommonBtn
              size="Xsmall"
              type="white"
              text="취소"
              onClick={onCancel}
            />
            <CommonBtn
              size="Xsmall"
              type="green"
              text="확인"
              onClick={handleConfirm}
              disabled={isButtonDisabled}
            />
          </>
        )}
      </div>
    </div>
  );

  const renderContent = (mode: string) => {
    switch (mode) {
      case 'add':
        return renderForm('새로운 카테고리 추가하기');
      case 'edit':
        return renderForm('카테고리 수정하기', true);
      case 'delete':
        return (
          <>
            <p className="sub7-sb mb-[1rem] text-center text-gray-900">
              카테고리를 삭제하시겠어요?
            </p>
            <p className="caption2-m mb-[1.6rem] text-center text-gray-500">
              저장한 정보가 모두 사라지게 돼요
            </p>
            <div className="flex justify-between gap-[1.6rem]">
              <CommonBtn
                size="Xsmall"
                type="white"
                text="삭제"
                onClick={onDelete}
              />
              <CommonBtn
                size="Xsmall"
                type="green"
                text="취소"
                onClick={onCancel}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center rounded-[10px] bg-[#00000063]">
      <div className="flex w-[26rem] flex-col rounded-xl bg-white p-[2rem] shadow-[6px_11px_20px_0_rgba(0,0,0,0.08)]">
        {renderContent(mode)}
      </div>
    </div>
  );
};

export default TextfieldPopup;
