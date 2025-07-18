import axios from 'axios';

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const fetchToken = async (email?: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/v1/auth/token`,
    {
      params: { email },
    }
  );
  const newToken = response.data.token;
  chrome.storage.local.set({ jwtToken: newToken }, () => {
    console.log('Token saved to chrome storage');
  });
  return newToken;
};

apiRequest.interceptors.request.use(async (config) => {
  const noAuthNeeded = ['/api/v1/auth/token', '/api/v1/auth/signup'];
  const isNoAuth = noAuthNeeded.some((url) => config.url?.includes(url));

  if (!isNoAuth) {
    let token =
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwaW5iYWNrIiwiaWQiOiJhOTA1NGFjOS03MTg0LTQ3NjktYWY4Mi1jNGViYTg0YzYxYTIiLCJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTc1MjgwMDY1Nn0.hXti-Jlnhg8mRoPl5nB8Vi8UV6HPdZYAtgtpTuqtH39lQWle8T5GlX0ug0nNVUqu5B_Pyzafck7lhfXN6ArHOA';

    if (!token || token === 'undefined') {
      token = await fetchToken('test@gmail.com');
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const noAuthNeeded = ['/api/v1/auth/token', '/api/v1/auth/signup'];
    const isNoAuth = noAuthNeeded.some((url) =>
      originalRequest.url?.includes(url)
    );
    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry &&
      !isNoAuth
    ) {
      originalRequest._retry = true;
      const newToken = await fetchToken('test@gmail.com');
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return apiRequest(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default apiRequest;
