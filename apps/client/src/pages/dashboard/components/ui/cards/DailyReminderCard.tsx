import bookmarkCardAcorn from '@assets/characters/acorn/bookmark-card.svg';
import acornStamp from '@assets/characters/acorn/stamp.svg';
import icDetailsWhite from '@assets/icons/ui/details-white.svg';
import emptyMemo from '@assets/illustrations/empty-states/memo.svg';
import Thumbnail from '@pages/dashboard/components/ui/cards/Thumbnail';
import { cn } from '@shared/utils/cn';
import { CARD_CLASSES } from '@shared/utils/styleUtils';
import { cva, type VariantProps } from 'class-variance-authority';

const formatRemindTime = (dateString: string): string => {
  try {
    const match = dateString.match(
      /(\d{4})년\s*(\d{2})월\s*(\d{2})일\s*(오전|오후)\s*(\d{1,2})시\s*(\d{1,2})분/
    );

    if (match) {
      const [, year, month, day, meridiem, hour, minute] = match;
      const displayHour = String(parseInt(hour)).padStart(2, '0');
      const displayMinute = String(parseInt(minute)).padStart(2, '0');

      const result = `${year}/${month}/${day} ${meridiem} ${displayHour}:${displayMinute}`;
      return result;
    }

    return dateString;
  } catch (error) {
    return dateString;
  }
};

const dailyReminderCardVariants = cva('relative cursor-pointer', {
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
  'absolute left-0 top-0 flex h-full w-[28.3rem] items-center justify-center rounded-[1rem] pointer-events-none',
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

interface DailyReminderCardProps {
  title: string;
  memo?: string;
  url: string;
  savedAt: string;
  isRead?: boolean;
  handlePopUpOpen?: () => void;
  onClick?: () => void;
  onDotClick?: () => void;
}

const DailyReminderCard = ({
  title,
  memo,
  url,
  savedAt,
  isRead = false,
  handlePopUpOpen,
  onClick,
  onDotClick,
}: DailyReminderCardProps) => {
  const handleCardClick = (e: React.MouseEvent) => {
    // 버튼이나 버튼 내부 요소를 클릭한 경우 카드 클릭 이벤트를 무시
    if ((e.target as HTMLElement).closest('button')) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.();
  };

  return (
    <div
      className={cn(dailyReminderCardVariants({ showAcornStamp: isRead }))}
      onClick={handleCardClick}
    >
      <div className={CARD_CLASSES.dailyHeader}>
        <div className="flex items-center">
          <img
            src={bookmarkCardAcorn}
            alt="acorn"
            className="h-[2.4rem] w-[2.4rem]"
          />
          <span className="body2-m ml-[1rem] leading-[4rem] text-white">
            {formatRemindTime(savedAt)}
          </span>
        </div>
        <button
          type="button"
          className="flex h-[2.4rem] w-[2.4rem] items-center justify-center"
          aria-label="더보기"
          onClick={(e) => {
            e.stopPropagation();
            handlePopUpOpen?.();
          }}
        >
          <img
            src={icDetailsWhite}
            alt="더보기"
            className={CARD_CLASSES.moreButton}
            onClick={onDotClick}
          />
        </button>
      </div>

      <div className={CARD_CLASSES.dailyBody}>
        <div className="flex flex-col items-center">
          <div className={cn(CARD_CLASSES.thumbnail, 'mb-[1.8rem]')}>
            <Thumbnail url={url} alt="데일리 리마인드 썸네일" />
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

      <div className={cn(stampOverlayVariants({ showAcornStamp: isRead }))}>
        <img src={acornStamp} alt="도토리 스탬프" className="h-auto w-auto" />
      </div>
    </div>
  );
};

export default DailyReminderCard;
