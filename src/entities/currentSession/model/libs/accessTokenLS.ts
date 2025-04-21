import { apiWithouToken } from "@/shared/api/api";

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Получение токена доступа
export const getAccessToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// Сохранение токена доступа
export const  setAccessToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Получение токена обновления
export const getRefreshToken = (): string | null => {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
};

// Сохранение токена обновления
export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

// Функция для обновления токена
export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  // уточнить endpoint для refresh
  const response = await apiWithouToken.post(`/refresh`, {
    refresh_token: refreshToken,
  });

  const newAccessToken = response.data.access_token;
  const newRefreshToken = response.data.refresh_token;

  // Сохраняем новые токены в localStorage
  setAccessToken(newAccessToken);
  setRefreshToken(newRefreshToken);

  return newAccessToken;
};
