import informationSvg from '/src/assets/illustrations/empty-states/information.svg';
import urlSvg from '/src/assets/illustrations/empty-states/url.svg';

export const EMPTY_STATE_PRESETS = {
  information: {
    title: '정보가 없습니다',
    description: '아직 저장된 정보가 없어요',
    image: informationSvg,
  },
  url: {
    title: 'URL이 없습니다',
    description: '아직 저장된 URL이 없어요',
    image: urlSvg,
  },
} as const;
