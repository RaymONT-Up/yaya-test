import axios from 'axios'
import { getToken } from '@/entities/currentSession'
import { BASE_API_URL } from '../consts/baseUrl'

export const apiClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Интерцептор для запроса: добавляем токен
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Интерцептор для ответа: пока нет необходимости
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const newToken = await refreshAccessToken();
//         if (newToken) {
//           originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
//           return apiClient(originalRequest);
//         }
//       } catch (err) {
//         console.error("Token refresh failed:", err);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export const apiWithouToken = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
