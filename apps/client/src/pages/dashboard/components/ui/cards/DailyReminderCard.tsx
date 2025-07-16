import { cva, type VariantProps } from 'class-variance-authority';
import bookmarkCardAcorn from '@assets/characters/acorn/bookmark-card.svg';
import icDetailsWhite from '@assets/icons/ui/details-white.svg';
import emptyMemo from '@assets/illustrations/empty-states/memo.svg';
import acornStamp from '@assets/characters/acorn/stamp.svg';
import Thumbnail from '@pages/dashboard/components/ui/cards/Thumbnail';
import { CARD_CLASSES } from '@shared/utils/styleUtils';
import { cn } from '@shared/utils/cn';

const dailyReminderCardVariants = cva('relative', {
  variants: {
    showAcornStamp: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    showAcornStamp: false,
  },
});

const stampOverlayVariants = cva(
  'absolute left-0 top-0 flex h-full w-[28.3rem] items-center justify-center rounded-[1rem]',
  {
    variants: {
      showAcornStamp: {
        true: 'bg-black/40',
        false: 'hidden',
      },
    },
    defaultVariants: {
      showAcornStamp: false,
    },
  }
);

const dailyMemoVariants = cva(
  'w-[25.3rem] h-[9.6rem] p-[1.2rem] rounded-[0.6rem] flex items-center justify-center bg-gray0',
  {
    variants: {
      hasMemo: {
        true: 'items-start justify-start',
        false: 'items-center justify-center',
      },
    },
    defaultVariants: {
      hasMemo: false,
    },
  }
);

export type DailyReminderCardVariants = VariantProps<
  typeof dailyReminderCardVariants
>;

interface DailyReminderCardProps extends DailyReminderCardVariants {
  title: string;
  memo?: string;
  images?: string[];
  savedAt: string;
  handlePopUpOpen?: () => void;
}

const DailyReminderCard = ({
  title,
  memo,
  images,
  savedAt,
  showAcornStamp = false,
  handlePopUpOpen,
}: DailyReminderCardProps) => {
  return (
    <div className={cn(dailyReminderCardVariants({ showAcornStamp }))}>
      <div className={CARD_CLASSES.dailyHeader}>
        <div className="flex items-center">
          <img
            src={bookmarkCardAcorn}
            alt="acorn"
            className="h-[2.4rem] w-[2.4rem]"
          />
          <span className="body2-m ml-[1rem] leading-[4rem] text-white">
            {savedAt}
          </span>
        </div>
        <button
          type="button"
          className="flex h-[2.4rem] w-[2.4rem] items-center justify-center"
          aria-label="더보기"
          onClick={handlePopUpOpen}
        >
          <img
            src={icDetailsWhite}
            alt="더보기"
            className={CARD_CLASSES.moreButton}
          />
        </button>
      </div>

      <div className={CARD_CLASSES.dailyBody}>
        <div className="flex flex-col items-center">
          <div
            className={cn(
              CARD_CLASSES.thumbnail,
              images && images.length > 0 ? 'bg-gray100' : '',
              'mb-[1.8rem]'
            )}
          >
            <Thumbnail
              src={images && images.length > 0 ? images[0] : undefined}
              alt="데일리 리마인드 썸네일"
            />
          </div>

          <div className={CARD_CLASSES.textArea}>
            <div className={CARD_CLASSES.title}>{title}</div>
            <div className={cn(dailyMemoVariants({ hasMemo: !!memo }))}>
              {memo ? (
                <div className={CARD_CLASSES.memoInner}>{memo}</div>
              ) : (
                <img
                  src={emptyMemo}
                  alt="메모가 텅 비었어요"
                  className="h-auto w-auto"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={cn(stampOverlayVariants({ showAcornStamp }))}>
        <img src={acornStamp} alt="도토리 스탬프" className="h-auto w-auto" />
      </div>
    </div>
  );
};

export default DailyReminderCard;
