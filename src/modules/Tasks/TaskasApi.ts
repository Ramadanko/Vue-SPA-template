import API from '@/utils/API'
import type { LocationQueryValue } from 'vue-router'

type query = {
  pageNumber: string | LocationQueryValue | number;
  pageSize: string | LocationQueryValue | number;
  search?: string | LocationQueryValue;
}

export const loadAllTasks = async (props?: {
  pageNumber: string | LocationQueryValue[] | number;
  pageSize: string | LocationQueryValue[] | number
}) => {
  const { pageSize = 1, pageNumber = 1 } = props ?? {}
  const { data } = await API.get(`/api/tasks?page=${pageNumber}&limit=${pageSize}`)
  return data
}

export const createNewTask = async (formData: any) => {
  return API.post(`/api/tasks`, formData)
}

