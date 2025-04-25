import axios from 'axios'
import { getToken } from '@/entities/currentSession'
import { BASE_API_URL } from '../consts/baseUrl'
import { getCenterId } from '@/entities/center'

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

    if (config.headers) {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
    }

    return config
  },
  (error) => Promise.reject(error)
)

export const apiWithTokenAndCenter = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiWithTokenAndCenter.interceptors.request.use(
  (config) => {
    const token = getToken()
    const centerId = getCenterId()

    if (config.headers) {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      if (centerId) {
        config.headers['X-Center-Id'] = centerId
      }
    }

    return config
  },
  (error) => Promise.reject(error)
)

export const apiWithouToken = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
