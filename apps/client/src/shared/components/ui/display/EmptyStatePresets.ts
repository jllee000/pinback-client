import informationSvg from '@assets/illustrations/empty-states/information.svg';
import urlSvg from '@assets/illustrations/empty-states/url.svg';

export const EMPTY_STATE_PRESETS = {
  url: {
    title: 'URL이 없습니다',
    description: '아직 저장된 URL이 없어요',
    image: urlSvg,
  },
  unread: {
    title: '저장한 정보는 다 꺼내봤어요!',
    description: '치삐가 다음 도토리를 기다리고 있어요',
    image: informationSvg,
  },
} as const;
