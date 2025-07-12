import emptyThumbnail from '@assets/illustrations/empty-states/thumbnail.svg';
import { ThumbnailProps } from '@shared/types';
import { cn } from '@shared/utils/cn';

const Thumbnail = ({ src, alt, className = '' }: ThumbnailProps) => {
  return (
    <>
      {src ? (
        <img
          src={src}
          alt={alt || '썸네일'}
          className={cn('h-full w-full object-cover', className)}
        />
      ) : (
        <img
          src={emptyThumbnail}
          alt="썸네일이 없어요"
          className={cn('h-auto w-auto', className)}
        />
      )}
    </>
  );
};

export default Thumbnail;
