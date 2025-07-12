import { Category } from '@shared/types';
import { UI_TEXT } from '@shared/constants';

interface BookmarkCardProps {
  title: string;
  memo?: string;
  image?: string;
  savedAt: string;
  isRead?: boolean;
  showAcornStamp?: boolean;
}

interface DailyReminderCardProps {
  title: string;
  memo?: string;
  images?: string[];
  savedAt: string;
  showAcornStamp?: boolean;
}

export const mockBookmarkCards: BookmarkCardProps[] = [
  // 테스트 케이스 1: 읽지 않음 + 메모 있음
  {
    title: 'React 컴포넌트 최적화 가이드',
    memo: 'React.memo, useMemo, useCallback을 활용한 성능 최적화 방법',
    image: 'https://placehold.co/253x130',
    savedAt: '2025. 07. 12 저장됨',
    isRead: false,
    showAcornStamp: true,
  },
  // 테스트 케이스 2: 읽음 + 메모 있음
  {
    title: 'TypeScript 고급 타입 활용법',
    memo: '조건부 타입, 매핑 타입, 템플릿 리터럴 타입 등 고급 TypeScript 기능',
    image: 'https://placehold.co/253x130',
    savedAt: '2025. 07. 11 저장됨',
    isRead: true,
    showAcornStamp: false,
  },
  // 테스트 케이스 3: 읽지 않음 + 빈 메모
  {
    title: '빈 메모 테스트 카드',
    memo: '',
    image: 'https://placehold.co/253x130',
    savedAt: '2025. 07. 10 저장됨',
    isRead: false,
    showAcornStamp: true,
  },
  // 테스트 케이스 4: 읽음 + 빈 메모
  {
    title: '읽은 빈 메모 테스트 카드',
    memo: '',
    image: 'https://placehold.co/253x130',
    savedAt: '2025. 07. 09 저장됨',
    isRead: true,
    showAcornStamp: false,
  },
  // 테스트 케이스 5: 이미지 없음 + 메모 있음
  {
    title: '이미지 없는 테스트 카드',
    memo: '이 카드는 이미지가 없는 북마크입니다.',
    image: undefined,
    savedAt: '2025. 07. 08 저장됨',
    isRead: false,
    showAcornStamp: true,
  },
  // 테스트 케이스 6: 긴 제목 테스트
  {
    title: '매우 긴 제목을 가진 북마크 카드 테스트 - 이 제목은 매우 길어서 여러 줄로 표시될 수 있습니다',
    memo: '긴 제목을 가진 카드의 메모입니다.',
    image: 'https://placehold.co/253x130',
    savedAt: '2025. 07. 07 저장됨',
    isRead: true,
    showAcornStamp: false,
  },
  // 테스트 케이스 7: 긴 메모 테스트
  {
    title: '긴 메모 테스트 카드',
    memo: '이것은 매우 긴 메모입니다. 메모가 길어질 때 텍스트가 어떻게 표시되는지 확인하기 위한 테스트입니다. 메모 영역의 높이가 고정되어 있으므로 긴 텍스트는 잘릴 수 있습니다.',
    image: 'https://placehold.co/253x130',
    savedAt: '2025. 07. 06 저장됨',
    isRead: false,
    showAcornStamp: true,
  },
  // 테스트 케이스 8: 특수문자 테스트
  {
    title: '특수문자 테스트 카드 !@#$%^&*()',
    memo: '특수문자: !@#$%^&*()_+-=[]{}|;:,.<>?',
    image: 'https://placehold.co/253x130',
    savedAt: '2025. 07. 05 저장됨',
    isRead: true,
    showAcornStamp: false,
  },
];

export const mockDailyReminderCards: DailyReminderCardProps[] = [
  {
    title: '리마인드',
    memo: '오늘 할 일: React 컴포넌트 테스트하기, 디자인 시스템 검토하기, 코드 리뷰 진행하기',
    images: ['https://placehold.co/253x130'],
    savedAt: '2025. 07. 12 저장됨',
    showAcornStamp: true,
  },
  {
    title: '리마인드',
    memo: '',
    images: [],
    savedAt: '2025. 07. 13 저장됨',
    showAcornStamp: false,
  },
];

export const mockCategories: Category[] = [
  { id: 'all', text: UI_TEXT.category.all, count: 8 },
  { id: 'frontend', text: '프론트엔드', count: 4 },
  { id: 'backend', text: '백엔드', count: 2 },
  { id: 'design', text: '디자인', count: 1 },
  { id: 'devops', text: 'DevOps', count: 1 },
];
