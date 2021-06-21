import axios from "axios"
import { userType } from "../../types/types"

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {"API-KEY": "89f1cf96-201c-4204-80f3-d30cb69af1f1"}
})

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodesForCaptchaEnum {
  CuptchaIsRequired = 10,
}

export type ResponseTypeApi<D = {}, RC = ResultCodesEnum> = {
  data: D
  messages: Array<string> 
  resultCode: RC
}
export type MeResponseDataType = {
  id: number
  email: string
  login: string
}
export type loginResponseDataType = {
  data: { 
    userId: number
  }
  resultCode: ResultCodesEnum | ResultCodesForCaptchaEnum
  messages: Array<string>
}

export type GetUserItemsType = {
  items: Array<userType>
  totalCount: number
  error: string | null
}