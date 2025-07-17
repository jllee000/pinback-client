import { useMutation } from '@tanstack/react-query';
import { postSignUp, postSignUpRequest } from './axios';

export const usePostSignUp = () => {
  return useMutation({
    mutationFn: (infoData: postSignUpRequest) => postSignUp(infoData),
  });
};
