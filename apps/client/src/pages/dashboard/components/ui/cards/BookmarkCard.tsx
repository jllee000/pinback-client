import { cva, type VariantProps } from 'class-variance-authority';
import icDetails from '@assets/icons/ui/details.svg';
import emptyMemo from '@assets/illustrations/empty-states/memo.svg';
import Thumbnail from '@pages/dashboard/components/ui/cards/Thumbnail';
import { CARD_CLASSES } from '@shared/utils/styleUtils';
import { cn } from '@shared/utils/cn';

const bookmarkCardVariants = cva(
  'relative w-[28.3rem] px-[1.5rem] py-[2rem] rounded-[1rem] inline-flex flex-col justify-start items-start gap-2.5 h-[36.8rem]',
  {
    variants: {
      isRead: {
        true: 'bg-white border border-gray200',
        false: 'bg-main0 border border-main400',
      },
    },
    defaultVariants: {
      isRead: false,
    },
  }
);

const memoVariants = cva(
  'w-[25.3rem] h-[9.6rem] p-[1.2rem] rounded-[0.6rem] flex items-center justify-center',
  {
    variants: {
      isRead: {
        true: 'bg-gray0',
        false: 'bg-white',
      },
    },
    defaultVariants: {
      isRead: false,
    },
  }
);

export type BookmarkCardVariants = VariantProps<typeof bookmarkCardVariants>;

interface BookmarkCardProps extends BookmarkCardVariants {
  image?: string;
  memo?: string;
  title: string;
  handlePopUpOpen?: () => void;
}

const BookmarkCard = ({
  image,
  memo,
  title,
  isRead = false,
  handlePopUpOpen,
}: BookmarkCardProps) => {
  return (
    <div className={cn(bookmarkCardVariants({ isRead }))}>
      <div className="mb-[1.8rem] flex w-full items-center justify-between">
        <div className="inline-flex w-64 flex-col items-start justify-start gap-4">
          <div
            className={cn(CARD_CLASSES.thumbnail, image ? 'bg-gray100' : '')}
          >
            <Thumbnail src={image} alt="북마크 썸네일" />
          </div>

          <div>
            <div className={CARD_CLASSES.title}>{title}</div>
            <div className={cn(memoVariants({ isRead }))}>
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

        <button
          type="button"
          className="absolute bottom-[2rem] right-[1.8rem] flex items-center justify-center"
          aria-label="더보기"
          onClick={handlePopUpOpen}
        >
          <img
            src={icDetails}
            alt="더보기"
            className={CARD_CLASSES.moreButton}
          />
        </button>
      </div>
    </div>
  );
};

export default BookmarkCard;
