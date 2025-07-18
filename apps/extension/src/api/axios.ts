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

export const postCategories = async (payload: { categoryName: string }) => {
  const response = await apiRequest.post('/api/v1/categories', payload);
  return response.data;
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
