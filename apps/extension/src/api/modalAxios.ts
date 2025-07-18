import apiRequest from './axiosInstance';

export const getRemindTime = async (time: String) => {
  const { data } = await apiRequest.get(
    `/api/v1/users/remind-time?now=${time}`,
    {}
  );
  return data;
};
