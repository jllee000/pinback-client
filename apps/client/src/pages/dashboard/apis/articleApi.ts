import apiRequest from '@shared/apis/axiosInstance';
import type { AxiosResponse } from 'axios';

import type {
  ArticleDetail,
  ArticleListResponse,
  UnreadArticleResponse,
  DailyReminderArticleResponse,
  ReadStatusResponse,
  ApiResponse,
} from '@pages/dashboard/types/api';

export const getArticleDetail = async (
  articleId: number
): Promise<AxiosResponse<ApiResponse<ArticleDetail>>> => {
  return await apiRequest.get<ApiResponse<ArticleDetail>>(
    `/api/v1/articles/${articleId}`
  );
};

export const getArticlesByCategory = async (
  categoryId: number,
  page = 0,
  size = 12
): Promise<AxiosResponse<ApiResponse<ArticleListResponse>>> => {
  return await apiRequest.get<ApiResponse<ArticleListResponse>>(
    `/api/v1/articles/category?categoryId=${categoryId}&page=${page}&size=${size}`
  );
};

export const getUnreadArticles = async (
  page = 0,
  size = 12
): Promise<AxiosResponse<ApiResponse<UnreadArticleResponse>>> => {
  return await apiRequest.get<ApiResponse<UnreadArticleResponse>>(
    `/api/v1/articles/unread?page=${page}&size=${size}`
  );
};

export const getDailyReminderArticles = async (
  now: string,
  page = 0,
  size = 12
): Promise<AxiosResponse<ApiResponse<DailyReminderArticleResponse>>> => {
  const url = `/api/v1/articles/remind?now=${encodeURIComponent(now)}&page=${page}&size=${size}`;

  return await apiRequest.get<ApiResponse<DailyReminderArticleResponse>>(url);
};

export const updateArticleReadStatus = async (
  articleId: number
): Promise<AxiosResponse<ApiResponse<ReadStatusResponse>>> => {
  return await apiRequest.patch<ApiResponse<ReadStatusResponse>>(
    `/api/v1/articles/${articleId}/readStatus`
  );
};
