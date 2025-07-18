import {
  getCategoriesDash,
  postArticles,
  postCategories,
  patchCategories,
  deleteCategories,
} from './axios';
import { useQuery, useMutation } from '@tanstack/react-query';
export const useGetCategoriesDash = () => {
  return useQuery({
    queryKey: ['categoriesDash'],
    queryFn: getCategoriesDash,
  });
};

export const usePostArticles = () => {
  return useMutation({
    mutationFn: postArticles,
  });
};

export const usePostCategories = () => {
  return useMutation({
    mutationFn: postCategories,
  });
};

interface PatchCategoryParams {
  categoryId: number;
  categoryName: string;
}

export const usePatchCategories = () => {
  return useMutation({
    mutationFn: patchCategories,
  });
};

export const useDeleteCategories = () => {
  return useMutation({
    mutationFn: deleteCategories,
  });
};
