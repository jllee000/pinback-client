import { apiRequest } from '@/shared';

export interface postSignUpRequest {
  email: string | null;
  finalTime: string | null;
  token: string | null;
}

export const postSignUp = async ({
  email,
  finalTime,
  token,
}: postSignUpRequest) => {
  const { data } = await apiRequest.post('/api/v1/auth/signup', {
    email,
    remindDefault: finalTime,
    fcmToken: token,
  });
  return data;
};
