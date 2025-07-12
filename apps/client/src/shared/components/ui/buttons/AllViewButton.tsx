import arrowUp from '@assets/icons/ui/arrow-up.svg';
import { AllViewButtonProps } from '@shared/types';
import { UI_TEXT } from '@shared/constants';

const AllViewButton = ({ onClick, isExpanded = false }: AllViewButtonProps) => {
  return (
    <button
      type="button"
      className="outline-gray200 flex h-[5.5rem] w-[16rem] items-center justify-center gap-[1rem] rounded-[5rem] bg-white outline-1 outline-offset-[-1px]"
      onClick={onClick}
    >
      <div className="flex h-[2.8rem] w-[2.8rem] items-center justify-center">
        <img
          src={arrowUp}
          alt="화살표"
          className={`h-[2.8rem] w-[2.8rem] ${isExpanded ? 'rotate-180' : ''}`}
        />
      </div>
      <div className="text-gray700 sub4-sb flex items-baseline">
        {isExpanded ? UI_TEXT.button.collapse : UI_TEXT.button.allView}
      </div>
    </button>
  );
};

export default AllViewButton;
