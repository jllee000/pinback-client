import apiRequest from '@shared/apis/axiosInstance';
import type { AxiosResponse } from 'axios';

import type {
  ApiResponse,
  CategoryListResponse,
} from '@pages/dashboard/types/api';

export const getDashboardCategories = async (): Promise<
  AxiosResponse<ApiResponse<CategoryListResponse>>
> => {
  return await apiRequest.get<ApiResponse<CategoryListResponse>>(
    '/api/v1/categories/dashboard'
  );
};

export const getModalCategories = async () => {
  const { data } = await apiRequest.get('/api/v1/categories/extension');
  return data;
};
