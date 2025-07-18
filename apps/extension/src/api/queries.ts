import { getCategoriesDash, postArticles } from './axios';
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
