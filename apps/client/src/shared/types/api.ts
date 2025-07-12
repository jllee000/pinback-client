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
