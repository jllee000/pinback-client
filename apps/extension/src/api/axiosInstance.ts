import axios from 'axios';
import { useState } from 'react';

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
  const newToken = response.data.data.token;
  chrome.storage.local.set({ jwtToken: newToken }, () => {
    console.log('Token saved to chrome storage다시', newToken);
  });
  return newToken;
};

apiRequest.interceptors.request.use(async (config) => {
  const noAuthNeeded = ['/api/v1/auth/token', '/api/v1/auth/signup'];
  const isNoAuth = noAuthNeeded.some((url) => config.url?.includes(url));

  if (isNoAuth) return config;

  const email = await new Promise<string | undefined>((resolve) => {
    chrome.storage.local.get('email', (result) => {
      resolve(result.email);
    });
  });

  let token = await new Promise<string | undefined>((resolve) => {
    chrome.storage.local.get('jwtToken', (result) => {
      resolve(result.jwtToken);
    });
  });

  // 토큰 없으면 fetchToken 호출
  if (!token || token === 'undefined') {
    console.log(email, '여기야');
    token = await fetchToken(email);
  }

  config.headers.Authorization = `Bearer ${token}`;
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
