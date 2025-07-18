import apiRequest from './axiosInstance';

export const getCategoriesDash = async () => {
  const { data } = await apiRequest.get('/api/v1/categories/dashboard', {});
  return data;
};

export const postArticles = async (payload: {
  url: string;
  categoryId: number | null;
  memo: string;
  remindTime: string | null;
}) => {
  const response = await apiRequest.post('/api/v1/articles', payload);
  return response.data;
};
