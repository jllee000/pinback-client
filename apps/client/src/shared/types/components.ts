import type { ReactNode } from 'react';

export interface HeaderProps {
  className?: string;
}

export interface SectionTitleProps {
  text: string;
  variant?: 'dailyReminder' | 'bookmark' | 'notification';
}

export interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}



export interface SectionContentProps {
  text?: string;
  rewardIcon?: 'acorn' | 'logo';
  onComplete?: () => void;
}

export interface Category {
  id: string;
  text: string;
  count: number;
}

export interface CategoryProps extends Category {
  isActive?: boolean;
  onClick?: () => void;
  hideZeroCount?: boolean;
}





export interface AllViewButtonProps {
  onClick?: () => void;
  isExpanded?: boolean;
}

export interface LevelBannerProps {
  level: number;
  onClick?: () => void;
}

export interface ThumbnailProps {
  src?: string;
  alt?: string;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export interface LevelInfoItemProps {
  level: number;
  name: string;
  image: string;
  acorns: string;
}

export interface LevelInfoSectionProps {
  className?: string;
}

export interface LevelInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}
