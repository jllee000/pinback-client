import type { CSSProperties } from 'react';

export const createDynamicStyle = (
  width?: number,
  height?: number,
  additionalClasses = ''
) => {
  const style: CSSProperties = {};

  if (width) {
    style.width = width;
  }
  if (height) {
    style.height = height;
  }

  return { style, className: additionalClasses };
};

export const combineClassNames = (
  ...classNames: (string | undefined | null | false)[]
): string => {
  return classNames.filter(Boolean).join(' ');
};

export const CARD_CLASSES = {
  container:
    'relative w-[28.3rem] px-[1.5rem] py-[2rem] rounded-[1rem] border inline-flex flex-col justify-start items-start gap-2.5',

  bookmark: 'h-[36.8rem]',

  thumbnail:
    'w-[25.3rem] h-[13rem] overflow-hidden flex items-center justify-center rounded-[1rem]',

  memo: 'w-[25.3rem] h-[9.6rem] pl-[4.7rem] pr-[6.7rem] py-[1.2rem] rounded-[0.6rem] flex items-center justify-center',
  memoInner:
    'w-[22.9rem] max-h-[7.2rem] body2-m text-gray400 break-words self-start overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] [line-height:1.6]',

  dailyHeader:
    'relative w-[28.3rem] h-[4rem] bg-main300 rounded-t-[1rem] flex items-center justify-between px-[1rem] py-0',
  dailyBody:
    'w-[28.3rem] flex-1 bg-white rounded-b-[1rem] border border-t-0 border-gray200 px-[1rem] py-[2rem] flex flex-col',

  moreButton: 'w-[2.4rem] h-[2.4rem] flex items-center justify-center',

  title: 'w-[25.3rem] head6 text-gray900 mb-[1rem] line-clamp-1 break-words',
  textArea: 'w-[25.3rem]',
};

export const SPACING_CLASSES = {
  thumbnailMargin: 'mb-[1.8rem]',
  titleMargin: 'mb-[1.2rem]',
  sectionMargin: 'mb-8',
  cardGap: 'gap-4',
  categoryGap: 'gap-[2rem]',
};

export const LAYOUT_CLASSES = {
  centerContainer: 'flex justify-center',
  pageContainer: 'min-h-screen flex flex-col',
  mainContainer: 'mx-auto',
  paddingContainer: 'px-4',
};
