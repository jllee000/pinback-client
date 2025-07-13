import React from 'react';
import { Icon } from '@pinback/design-system/icons';

type Mode = 'add' | 'edit' | 'delete';

interface TextfieldPopupProps {
  mode: Mode;
  value?: string;
  onCancel?: () => void;
  onConfirm: (value?: string) => void;
  onDelete?: () => void;
}

const TextfieldPopup = ({
  mode,
  value = '',
  onCancel,
  onConfirm,
  onDelete,
}: TextfieldPopupProps) => {
  const [inputValue, setInputValue] = React.useState(value);

  const renderContent = () => {
    switch (mode) {
      case 'add':
        return (
          <div className="flex flex-col gap-[1.6rem]">
            <h2 className="sub7-sb text-center text-gray-900">
              새로운 카테고리 추가하기
            </h2>
            <input
              className="h-[4.2rem] rounded border border-gray-300 px-3"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="카테고리 이름 입력"
            />
            <div className="flex justify-between">
              <button
                className="h-[4rem] w-[10.2rem] text-gray-900"
                onClick={onCancel}
              >
                취소
              </button>
              <button
                className="bg-main400 h-[4rem] w-[10.2rem] rounded text-white"
                onClick={() => onConfirm(inputValue)}
              >
                확인
              </button>
            </div>
          </div>
        );
      case 'edit':
        return (
          <div className="relative flex flex-col gap-[1.6rem]">
            <Icon
              name="close-button"
              width={24}
              height={24}
              className="absolute right-0 top-0 cursor-pointer"
              onClick={onCancel}
            />
            <h2 className="sub7-sb text-center text-gray-900">
              카테고리 수정하기
            </h2>
            <input
              className="h-[4.2rem] rounded border border-gray-300 px-3"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="h-[4rem] w-[10.2rem] text-gray-900"
                onClick={onDelete}
              >
                삭제
              </button>
              <button
                className="bg-main400 h-[4rem] w-[10.2rem] rounded text-white"
                onClick={() => onConfirm(inputValue)}
              >
                수정
              </button>
            </div>
          </div>
        );
      case 'delete':
        return (
          <>
            <h2 className="sub7-sb mb-[1rem] text-center text-gray-900">
              카테고리를 삭제하시겠어요?
            </h2>
            <p className="caption2-m mb-[1.6rem] text-center text-gray-500">
              저장한 정보가 모두 사라지게 돼요
            </p>
            <div className="flex justify-between">
              <button
                className="h-[4rem] w-[10.2rem] bg-white text-black"
                onClick={onDelete}
              >
                삭제
              </button>
              <button
                className="bg-main400 h-[4rem] w-[10.2rem] rounded text-white"
                onClick={onCancel}
              >
                취소
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex w-[26rem] flex-col rounded-xl bg-white p-[2rem] shadow-[6px_11px_20px_0_rgba(0,0,0,0.08)]">
        {renderContent()}
      </div>
    </div>
  );
};

export default TextfieldPopup;
