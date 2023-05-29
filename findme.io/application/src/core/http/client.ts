import axios from 'axios';
import { settings } from '@core/Settings';
import { __app__ } from '@core/MainActivity';
import { Alert } from 'react-native';

const TIMER_15_SEC = 15000;
const abortMessage = (event: Event) => {
  Alert.alert('Warning', 'Something went wrong. Check your internet connection or it can be caused by Find Me server');
};

let timeoutId: null | ReturnType<typeof setTimeout> = null;
const axiosImpl = axios.create({
  baseURL: `${settings.API_URL}${settings.API_V2}`,
  timeout: 60 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosImpl.interceptors.request.use((config) => {
  const token = __app__.getCurrentUser.tokens.access_token;
  if (token) {
    config.headers.Authorization = `Bearer@${token}`;
  }
  const abortController = new AbortController();
  const signal = abortController.signal;
  config.signal = signal;
  signal.addEventListener('abort', abortMessage);

  if (timeoutId !== null) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    abortController.abort();
    signal.removeEventListener('abort', abortMessage);
  }, TIMER_15_SEC);

  return config;
}, (rej) => {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
  }

  return Promise.reject(rej);
});

axiosImpl.interceptors.response.use((config) => {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
  }
  config.config.signal?.removeEventListener && config.config.signal?.removeEventListener('abort', abortMessage);
  return {
    ...config,
    success: config.status === 200 || config.status === 201,
  };
}, (error) => {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
  }

  return Promise.reject(error);
});

export { axiosImpl };
