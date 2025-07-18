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
export const patchCategories = async ({
  categoryId,
  categoryName,
}: {
  categoryId: number;
  categoryName: string;
}) => {
  const response = await apiRequest.patch(`/api/v1/categories/${categoryId}`, {
    categoryName,
  });
  return response.data;
};

export const deleteCategories = async ({
  categoryId,
}: {
  categoryId: number;
}) => {
  const response = await apiRequest.delete(
    `/api/v1/categories/${categoryId}`,
    {}
  );
  return response.data;
};

export const patchArticles = async ({
  articleId,
  categoryId,
  memo,
  remindTime,
}: {
  articleId: number;
  categoryId: number;
  memo: string;
  remindTime: string;
}) => {
  const response = await apiRequest.patch(`/api/v1/articles/${articleId}`, {
    categoryId,
    memo,
    remindTime,
  });
  return response.data;
};

export const postCategories = async (payload: { categoryName: string }) => {
  const response = await apiRequest.post('/api/v1/categories', payload);
  return response.data;
};
