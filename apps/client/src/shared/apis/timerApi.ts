import apiRequest from '@shared/apis/axiosInstance';
import type {
  ServerTimeResponse,
  ReminderTimerResponse,
  DailyReminderResponse,
  BookmarkResponse,
  AcornCountResponse,
} from '@shared/types';

export const getServerTime = async (): Promise<ServerTimeResponse> => {
  const { data } = await apiRequest.get<ServerTimeResponse>('/api/time');
  return data;
};

export const getActiveReminderTimer =
  async (): Promise<ReminderTimerResponse | null> => {
    const { data } = await apiRequest.get<ReminderTimerResponse | null>(
      '/api/reminder-timers/active'
    );
    return data;
  };

export const getDailyReminderCards = async (
  limit = 12,
  offset = 0
): Promise<DailyReminderResponse> => {
  const { data } = await apiRequest.get<DailyReminderResponse>(
    `/api/daily-reminders?limit=${limit}&offset=${offset}`
  );
  return data;
};

export const getBookmarkCards = async (
  categoryId?: string,
  limit?: number,
  offset = 0
): Promise<BookmarkResponse> => {
  const params = new URLSearchParams();
  if (categoryId && categoryId !== 'all') {
    params.append('categoryId', categoryId);
  }
  if (limit) {
    params.append('limit', limit.toString());
  }
  params.append('offset', offset.toString());

  const { data } = await apiRequest.get<BookmarkResponse>(
    `/api/bookmarks?${params.toString()}`
  );
  return data;
};

export const getAcornCount = async (): Promise<AcornCountResponse> => {
  const { data } = await apiRequest.get<AcornCountResponse>('/api/acorn-count');
  return data;
};
