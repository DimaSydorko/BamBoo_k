import { GetUserItemsType, instance } from './api';

export const usersAPI = {
  getUsers (currentPage = 1, pageSize = 5) {
    return instance.get<GetUserItemsType>(`users?page=${currentPage}&count=${pageSize}`)
    .then(res => res.data)
  },

  getFollow (userId: number) {
    return instance.post<ResponseType>(`follow/${userId}`).then(res => res.data)
  },
  getUnFollow (userId: number) {
    return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<ResponseType>
  },
}