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
  localStorage.setItem('jwtToken', newToken);
  return newToken;
};
const getChromeToken = async (): Promise<string | null> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(['jwtToken'], (result) => {
      resolve(result.jwtToken ?? null);
    });
  });
};

apiRequest.interceptors.request.use(async (config) => {
  const noAuthNeeded = ['/api/v1/auth/token', '/api/v1/auth/signin'];
  const isNoAuth = noAuthNeeded.some((url) => config.url?.includes(url));

  if (!isNoAuth) {
    let token = await getChromeToken();
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
    const noAuthNeeded = ['/api/v1/auth/token', '/api/v1/auth/signin'];
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
