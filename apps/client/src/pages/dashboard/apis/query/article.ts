import {
  deleteArticle,
  getArticleDetail,
  putArticle,
} from '@/pages/dashboard/apis/axios/article';
import { PutCategoryRequest } from '@/pages/dashboard/types/api';
import { queryClient } from '@/shared';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getModalCategories } from '../axios';

export const usePutArticle = (articleId: number, data: PutCategoryRequest) => {
  return useMutation({
    mutationFn: () => putArticle(articleId, data),
  });
};

export const useDeleteArticle = (articleId: number | null) => {
  return useMutation({
    mutationFn: () => deleteArticle(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unreadArticles'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardCategories'] });
      queryClient.invalidateQueries({ queryKey: ['categoryArticles'] });
      queryClient.invalidateQueries({ queryKey: ['dailyReminderArticles'] });
    },
  });
};

export const useGetModalCategories = () => {
  return useQuery({
    queryKey: ['modalCategories'],
    queryFn: getModalCategories,
  });
};

export const useGetArticleDetail = (articleId: number | null) => {
  return useQuery({
    queryKey: ['articleDetail', articleId],
    queryFn: () => getArticleDetail(articleId),
    enabled: !!articleId,
  });
};
