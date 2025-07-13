import { Category } from '@shared/types';
import { UI_TEXT } from '@pages/dashboard/constants';

export interface BookmarkCardProps {
  id: string;
  title: string;
  memo?: string;
  image?: string;
  savedAt: string;
  isRead?: boolean;
  showAcornStamp?: boolean;
  categoryId: string;
}

interface DailyReminderCardProps {
  id: string;
  title: string;
  memo?: string;
  images?: string[];
  savedAt: string;
  showAcornStamp?: boolean;
}

export const mockBookmarkCards: BookmarkCardProps[] = [
  // 테스트 케이스 1: 읽음 + 메모 있음
  {
    id: 'bookmark-1',
    title: 'React 컴포넌트 최적화 가이드',
    memo: 'React.memo, useMemo, useCallback을 활용한 성능 최적화 방법',
    image: 'https://placehold.co/253x130',
    savedAt: '2025. 07. 12 저장됨',
    isRead: true,
    showAcornStamp: false,
    categoryId: 'frontend',
  },
  // 테스트 케이스 2: 읽음 + 메모 있음
  {
    id: 'bookmark-2',
    title: 'TypeScript 고급 타입 활용법',
    memo: '조건부 타입, 매핑 타입, 템플릿 리터럴 타입 등 고급 TypeScript 기능',
    image: 'https://placehold.co/253x130',
    savedAt: '2025. 07. 11 저장됨',
    isRead: true,
    showAcornStamp: false,
    categoryId: 'frontend',
  },
  // 테스트 케이스 3: 읽음 + 빈 메모
  {
    id: 'bookmark-3',
    title: '빈 메모 테스트 카드',
    memo: '',
    image: 'https://placehold.co/253x130',
    savedAt: '2025. 07. 10 저장됨',
    isRead: true,
    showAcornStamp: false,
    categoryId: 'backend',
  },
  // 테스트 케이스 4: 읽음 + 빈 메모
  {
    id: 'bookmark-4',
    title: '읽은 빈 메모 테스트 카드',
    memo: '',
    image: 'https://placehold.co/253x130',
    savedAt: '2025. 07. 09 저장됨',
    isRead: true,
    showAcornStamp: false,
    categoryId: 'backend',
  },
  // 테스트 케이스 5: 이미지 없음 + 메모 있음
  {
    id: 'bookmark-5',
    title: '이미지 없는 테스트 카드',
    memo: '이 카드는 이미지가 없는 북마크입니다.',
    image: undefined,
    savedAt: '2025. 07. 08 저장됨',
    isRead: true,
    showAcornStamp: false,
    categoryId: 'design',
  },
  // 테스트 케이스 6: 긴 제목 테스트
  {
    id: 'bookmark-6',
    title:
      '매우 긴 제목을 가진 북마크 카드 테스트 - 이 제목은 매우 길어서 여러 줄로 표시될 수 있습니다',
    memo: '긴 제목을 가진 카드의 메모입니다.',
    image: 'https://placehold.co/253x130',
    savedAt: '2025. 07. 07 저장됨',
    isRead: true,
    showAcornStamp: false,
    categoryId: 'frontend',
  },
  // 테스트 케이스 7: 긴 메모 테스트
  {
    id: 'bookmark-7',
    title: '긴 메모 테스트 카드',
    memo: '이것은 매우 긴 메모입니다. 메모가 길어질 때 텍스트가 어떻게 표시되는지 확인하기 위한 테스트입니다. 메모 영역의 높이가 고정되어 있으므로 긴 텍스트는 잘릴 수 있습니다.',
    image: 'https://placehold.co/253x130',
    savedAt: '2025. 07. 06 저장됨',
    isRead: true,
    showAcornStamp: false,
    categoryId: 'devops',
  },
  // 테스트 케이스 8: 특수문자 테스트
  {
    id: 'bookmark-8',
    title: '특수문자 테스트 카드 !@#$%^&*()',
    memo: '특수문자: !@#$%^&*()_+-=[]{}|;:,.<>?',
    image: 'https://placehold.co/253x130',
    savedAt: '2025. 07. 05 저장됨',
    isRead: true,
    showAcornStamp: false,
    categoryId: 'frontend',
  },
];

export const mockDailyReminderCards: DailyReminderCardProps[] = [
  {
    id: 'reminder-1',
    title: '리마인드 1',
    memo: '오늘 할 일: React 컴포넌트 테스트하기, 디자인 시스템 검토하기, 코드 리뷰 진행하기',
    images: ['https://placehold.co/253x130'],
    savedAt: '2025. 07. 12 저장됨',
    showAcornStamp: true,
  },
  {
    id: 'reminder-2',
    title: '리마인드 2',
    memo: '주간 회고: 이번 주 진행한 프로젝트들을 정리하고 다음 주 계획 세우기',
    images: ['https://placehold.co/253x130'],
    savedAt: '2025. 07. 13 저장됨',
    showAcornStamp: false,
  },
  {
    id: 'reminder-3',
    title: '리마인드 3',
    memo: '팀 미팅 준비: 발표 자료 정리, 질문 사항 정리, 회의 안건 검토',
    images: ['https://placehold.co/253x130'],
    savedAt: '2025. 07. 14 저장됨',
    showAcornStamp: true,
  },
  {
    id: 'reminder-4',
    title: '리마인드 4',
    memo: '기술 문서 작성: API 문서 업데이트, 사용자 가이드 작성, 트러블슈팅 가이드 정리',
    images: ['https://placehold.co/253x130'],
    savedAt: '2025. 07. 15 저장됨',
    showAcornStamp: false,
  },
  {
    id: 'reminder-5',
    title: '리마인드 5',
    memo: '성능 최적화: 번들 크기 분석, 이미지 최적화, 코드 스플리팅 적용',
    images: ['https://placehold.co/253x130'],
    savedAt: '2025. 07. 16 저장됨',
    showAcornStamp: true,
  },
  {
    id: 'reminder-6',
    title: '리마인드 6',
    memo: '보안 점검: 의존성 취약점 검사, 환경 변수 관리, 인증 로직 검토',
    images: ['https://placehold.co/253x130'],
    savedAt: '2025. 07. 17 저장됨',
    showAcornStamp: false,
  },
  {
    id: 'reminder-7',
    title: '리마인드 7',
    memo: '테스트 코드 작성: 단위 테스트, 통합 테스트, E2E 테스트 시나리오 작성',
    images: ['https://placehold.co/253x130'],
    savedAt: '2025. 07. 18 저장됨',
    showAcornStamp: true,
  },
  {
    id: 'reminder-8',
    title: '리마인드 8',
    memo: '배포 준비: 스테이징 환경 테스트, 롤백 계획 수립, 모니터링 설정',
    images: ['https://placehold.co/253x130'],
    savedAt: '2025. 07. 19 저장됨',
    showAcornStamp: false,
  },
  {
    id: 'reminder-9',
    title: '리마인드 9',
    memo: '사용자 피드백 수집: 설문조사 분석, 인터뷰 결과 정리, 개선사항 도출',
    images: ['https://placehold.co/253x130'],
    savedAt: '2025. 07. 20 저장됨',
    showAcornStamp: true,
  },
  {
    id: 'reminder-10',
    title: '리마인드 10',
    memo: '프로젝트 마무리: 최종 테스트, 문서 정리, 팀원들과 회고 진행',
    images: ['https://placehold.co/253x130'],
    savedAt: '2025. 07. 21 저장됨',
    showAcornStamp: false,
  },
  {
    id: 'reminder-11',
    title: '리마인드 11',
    memo: '새로운 프로젝트 기획: 요구사항 분석, 기술 스택 선정, 팀 구성 계획',
    images: ['https://placehold.co/253x130'],
    savedAt: '2025. 07. 22 저장됨',
    showAcornStamp: true,
  },
  {
    id: 'reminder-12',
    title: '리마인드 12',
    memo: '개인 학습: 새로운 기술 스택 학습, 컨퍼런스 참석, 커뮤니티 활동',
    images: ['https://placehold.co/253x130'],
    savedAt: '2025. 07. 23 저장됨',
    showAcornStamp: false,
  },
  {
    id: 'reminder-13',
    title: '리마인드 13',
    memo: '코드 리뷰: 팀원 코드 검토, 코딩 컨벤션 점검, 개선사항 제안',
    images: ['https://placehold.co/253x130'],
    savedAt: '2025. 07. 24 저장됨',
    showAcornStamp: true,
  },
  {
    id: 'reminder-14',
    title: '리마인드 14',
    memo: '데이터 분석: 사용자 행동 분석, 성능 지표 검토, 인사이트 도출',
    images: ['https://placehold.co/253x130'],
    savedAt: '2025. 07. 25 저장됨',
    showAcornStamp: false,
  },
  {
    id: 'reminder-15',
    title: '리마인드 15',
    memo: '인프라 관리: 서버 모니터링, 백업 점검, 보안 업데이트',
    images: ['https://placehold.co/253x130'],
    savedAt: '2025. 07. 26 저장됨',
    showAcornStamp: true,
  },
  {
    id: 'reminder-16',
    title: '리마인드 16',
    memo: '팀 빌딩: 팀워크 향상 활동, 멘토링 세션, 지식 공유',
    images: ['https://placehold.co/253x130'],
    savedAt: '2025. 07. 27 저장됨',
    showAcornStamp: false,
  },
];

export const mockCategories: Category[] = [
  { id: 'unread', text: '안 읽은 정보', count: 0 },
  { id: 'all', text: UI_TEXT.category.all, count: 8 },
  { id: 'frontend', text: '프론트엔드', count: 4 },
  { id: 'backend', text: '백엔드', count: 2 },
  { id: 'design', text: '디자인', count: 1 },
  { id: 'devops', text: 'DevOps', count: 1 },
];
