export interface ServerTimeResponse {
  currentTime: string;
  timezone: string;
}

export interface ReminderTimerResponse {
  id: string;
  userId: string;
  reminderTime: string;
  createdAt: string;
  isActive: boolean;
  intervalHours?: number;
}

export interface TimerState {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export interface BaseCard {
  id: string;
  title: string;
  memo?: string;
  savedAt: string;
}

export interface DailyReminderCard extends BaseCard {
  images?: string[];
  showAcornStamp: boolean;
}

export interface DailyReminderResponse {
  cards: DailyReminderCard[];
  totalCount: number;
  hasMore: boolean;
}

export interface BookmarkCard extends BaseCard {
  image?: string;
  isRead?: boolean;
  showAcornStamp?: boolean;
  categoryId: string;
}

export interface BookmarkResponse {
  cards: BookmarkCard[];
  totalCount: number;
  hasMore: boolean;
}
