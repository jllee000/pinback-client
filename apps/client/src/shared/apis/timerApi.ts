import apiRequest from '@shared/apis/axiosInstance';
import type { ServerTimeResponse, ReminderTimerResponse } from '@shared/types';

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
