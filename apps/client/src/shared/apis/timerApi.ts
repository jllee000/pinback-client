import apiRequest from '@shared/apis/axiosInstance';
import type {
  ServerTimeResponse,
  ReminderTimerResponse,
  DailyReminderResponse,
  BookmarkResponse,
} from '@shared/types';

export const getServerTime = async (): Promise<ServerTimeResponse> => {
  const response = await apiRequest.get<ServerTimeResponse>('/api/time');
  return response.data;
};

export const getActiveReminderTimer =
  async (): Promise<ReminderTimerResponse | null> => {
    const response = await apiRequest.get<ReminderTimerResponse | null>(
      '/api/reminder-timers/active'
    );
    return response.data;
  };

export const getDailyReminderCards = async (
  limit = 12,
  offset = 0
): Promise<DailyReminderResponse> => {
  const response = await apiRequest.get<DailyReminderResponse>(
    `/api/daily-reminders?limit=${limit}&offset=${offset}`
  );
  return response.data;
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

  const response = await apiRequest.get<BookmarkResponse>(
    `/api/bookmarks?${params.toString()}`
  );
  return response.data;
};
