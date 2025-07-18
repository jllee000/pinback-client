import apiRequest from '@shared/apis/axiosInstance';
import type { AxiosResponse } from 'axios';

import type {
  AcornCountWithRemindResponse,
  ApiResponse,
} from '@pages/dashboard/types/api';

export const getAcornCountWithRemind = async (
  now?: string
): Promise<AxiosResponse<ApiResponse<AcornCountWithRemindResponse>>> => {
  const url = now
    ? `/api/v1/users/acorns?now=${encodeURIComponent(now)}`
    : '/api/v1/users/acorns';

  return await apiRequest.get<ApiResponse<AcornCountWithRemindResponse>>(url);
};
