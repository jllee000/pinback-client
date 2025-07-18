import { useQuery } from '@tanstack/react-query';
import { getRemindTime } from './modalAxios';

export const useGetRemindTime = (time: string) => {
  return useQuery({
    queryKey: ['remindTime'],
    queryFn: () => getRemindTime(time),
  });
};
