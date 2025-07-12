import { EmptyStateProps } from './EmptyState';

export const EMPTY_STATE_PRESETS = {
  info: {
    title: '저장한 정보는 다 꺼내봤어요!',
    description: '치삐가 다음 도토리를 기다리고 있어요',
    image: '/src/assets/illustrations/empty-states/information.svg',
    imageAlt: '정보가 없음을 나타내는 일러스트레이션',
  } as EmptyStateProps,
  url: {
    title: '앗..',
    description: '저장된 url이 없어요',
    image: '/src/assets/illustrations/empty-states/url.svg',
    imageAlt: 'URL이 없음을 나타내는 일러스트레이션',
  } as EmptyStateProps,
}; 