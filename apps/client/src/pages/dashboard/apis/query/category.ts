import {
  patchCategories,
  deleteCategories,
  patchArticles,
  postCategories,
} from '../axios/category';
import { useMutation } from '@tanstack/react-query';

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
export const usePatchArticles = () => {
  return useMutation({
    mutationFn: patchArticles,
  });
};
export const usePostCategories = () => {
  return useMutation({
    mutationFn: postCategories,
  });
};
