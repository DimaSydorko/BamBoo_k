import { ResponseTypeApi, loginResponseDataType, instance, ResultCodesForCaptchaEnum, ResultCodesEnum } from "./api";

type MeResponseDataType = {
  id: number
  email: string
  login: string
}

export const authAPI = {
  me() {
    return instance.get<ResponseTypeApi<MeResponseDataType>>(`auth/me`).then(res => res.data)
  },
  login(email: string, password: string, remembreMe = false, captcha:string | null  = null) {
    return instance.post<ResponseTypeApi<loginResponseDataType, ResultCodesEnum | ResultCodesForCaptchaEnum>>(
      `auth/login`, {email, password, remembreMe, captcha}).then(res => res.data)
  },
  logout() {
    return instance.delete(`auth/login`)
  },
}