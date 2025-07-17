import { useState, useEffect, useCallback } from 'react';
import emptyThumbnail from '@assets/illustrations/empty-states/thumbnail.svg';
import type { ThumbnailProps } from '@pages/dashboard/types/components';
import { cn } from '@shared/utils/cn';
import { generateThumbnail } from '@pages/dashboard/utils/thumbnail';

interface ThumbnailState {
  url: string | null;
  isLoading: boolean;
  hasError: boolean;
}

const Thumbnail = ({
  alt,
  className = '',
  url,
}: Omit<ThumbnailProps, 'src'> & { url?: string }) => {
  const [state, setState] = useState<ThumbnailState>({
    url: null,
    isLoading: false,
    hasError: false,
  });

  const generateThumbnailFromUrl = useCallback(async (url: string) => {
    if (!url) {
      return;
    }

    setState((prev) => ({
      ...prev,
      isLoading: true,
      hasError: false,
    }));

    try {
      const thumbnail = await generateThumbnail(url);

      if (thumbnail) {
        setState((prev) => ({
          ...prev,
          url: thumbnail,
          hasError: false,
          isLoading: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          url: null,
          hasError: false,
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('썸네일 생성 실패:', { url, error });

      setState((prev) => ({
        ...prev,
        hasError: false,
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    if (url) {
      generateThumbnailFromUrl(url);
    }
  }, [url, generateThumbnailFromUrl]);

  if (state.isLoading) {
    return (
      <div
        className={cn(
          'flex h-full w-full animate-pulse items-center justify-center rounded bg-gray-200',
          className
        )}
      >
        <div className="text-xs text-gray-400">썸네일 로딩 중...</div>
      </div>
    );
  }

  if (state.hasError || !state.url) {
    return (
      <img
        src={emptyThumbnail}
        alt="썸네일이 없어요"
        className={cn('h-full w-full object-contain', className)}
      />
    );
  }

  return (
    <img
      src={state.url}
      alt={alt || '썸네일'}
      className={cn('h-full w-full object-cover', className)}
      onError={() => {
        setState((prev) => ({ ...prev, hasError: true, url: null }));
      }}
      onLoad={() => {
        // 이미지 로드 완료
      }}
    />
  );
};

export default Thumbnail;
