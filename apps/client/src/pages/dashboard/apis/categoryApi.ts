import apiRequest from '@shared/apis/axiosInstance';
import type { AxiosResponse } from 'axios';

import type {
  CategoryListResponse,
  ApiResponse,
} from '@pages/dashboard/types/api';

export const getDashboardCategories = async (): Promise<
  AxiosResponse<ApiResponse<CategoryListResponse>>
> => {
  return await apiRequest.get<ApiResponse<CategoryListResponse>>(
    '/api/v1/categories/dashboard'
  );
};
