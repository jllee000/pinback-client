import chippyLevel1 from '@assets/characters/chippy/level-1.svg';
import chippyLevel2 from '@assets/characters/chippy/level-2.svg';
import chippyLevel3 from '@assets/characters/chippy/level-3.svg';
import chippyLevel4 from '@assets/characters/chippy/level-4.svg';
import chippyLevel5 from '@assets/characters/chippy/level-5.svg';

export const CHIPPY_LEVELS = [
  {
    level: 5,
    name: '행복한 치삐',
    acorns: '7개 이상',
    image: chippyLevel5,
  },
  {
    level: 4,
    name: '배부른 치삐',
    acorns: '5-6개',
    image: chippyLevel4,
  },
  {
    level: 3,
    name: '출출한 치삐',
    acorns: '3-4개',
    image: chippyLevel3,
  },
  {
    level: 2,
    name: '배고픈 치삐',
    acorns: '1-2개',
    image: chippyLevel2,
  },
  {
    level: 1,
    name: '쫄쫄 굶은 치삐',
    acorns: '0개',
    image: chippyLevel1,
  },
] as const;
