import arrowUp from '@assets/icons/ui/arrow-up.svg';
import type { AllViewButtonProps } from '@pages/dashboard/types/components';
import { UI_TEXT } from '@pages/dashboard/constants';

const AllViewButton = ({ onClick, isExpanded = false }: AllViewButtonProps) => {
  const getArrowRotation = () => {
    if (isExpanded) {
      return 'rotate-180';
    }
    return '';
  };

  const getButtonText = () => {
    if (isExpanded) {
      return UI_TEXT.button.collapse;
    }
    return UI_TEXT.button.allView;
  };

  return (
    <button
      type="button"
      className="border-gray200 flex h-[5.5rem] w-[16rem] items-center justify-center gap-[1rem] rounded-[5rem] border bg-white"
      onClick={onClick}
    >
      <div className="flex h-[2.8rem] w-[2.8rem] items-center justify-center">
        <img
          src={arrowUp}
          alt="화살표"
          className={`h-[2.8rem] w-[2.8rem] ${getArrowRotation()}`}
        />
      </div>
      <div className="text-gray700 sub4-sb flex items-baseline">
        {getButtonText()}
      </div>
    </button>
  );
};

export default AllViewButton;
