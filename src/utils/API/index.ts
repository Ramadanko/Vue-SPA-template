import Auth from '@/utils/Auth'
import axios, { type CreateAxiosDefaults, type InternalAxiosRequestConfig } from 'axios'

const config: CreateAxiosDefaults = {
  baseURL: import.meta.env.BASE_URL,
  withCredentials: true
}

const API = axios.create(config)

API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = Auth.getAuthHeader()
  return config
}, (error) => Promise.reject(error))


export default API
