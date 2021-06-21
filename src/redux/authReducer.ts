import { authAPI } from "../components/api/authApi"
import { BaseThynkType, inferActiosTypes as InferActiosTypes } from "./redux-store"
import { securityAPI } from '../components/api/securityApi';
import { ResultCodesEnum, ResultCodesForCaptchaEnum } from "../components/api/api";

type InitialeStateType = typeof initialState
type ActionsType = InferActiosTypes<typeof actions>
type ThunkType = BaseThynkType<ActionsType>

let initialState = {   
  userId: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false as boolean,
  loginError: null as string | null,
  captchaUrl: null as string | null,
}

const authReducer = (state = initialState, action: ActionsType): InitialeStateType => {
  switch (action.type) {
    case 'SET_USER_DATA':
    case 'SET_LOGIN_ERROR':
    case 'GET_CAPTCH_URL_SUCCESS': {
      return {
        ...state,
        ...action.payload,
      }
    }
    default: 
      return state
  }
}


export const actions = {
  setAuthUserData: (userId: number|null, login: string|null, email: string|null, isAuth: boolean
    ) => ({type: 'SET_USER_DATA', payload: {userId, login, email, isAuth}} as const),
  getCaptchaUrlSuccess: (captchaUrl: string | null
    ) => ({type: 'GET_CAPTCH_URL_SUCCESS', payload: {captchaUrl}} as const),
  setLoginError: (loginError: string) => ({type: 'SET_LOGIN_ERROR', payload: {loginError}} as const),
}


export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const data = await authAPI.me()

  if (data.resultCode === ResultCodesEnum.Success){
    let {id, login, email} = data.data
    dispatch(actions.setAuthUserData(id, email, login, true)) 
  }
}

export const login = (
    email: string, password: string, rememberMe: boolean, captcha: string | null
  ): ThunkType => async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captcha)
    
    if (data.resultCode === ResultCodesEnum.Success){
      dispatch(getAuthUserData())
    } 
    else {
      if (data.resultCode === ResultCodesForCaptchaEnum.CuptchaIsRequired){
        dispatch(getCaptchaUrl())
      }
      dispatch(actions.setLoginError(data.messages[0]))
    }
  }

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl()
  const captchaUrl = data.url 
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
  let response = await authAPI.logout()
   
  if (response.data.resultCode === 0){
    dispatch(actions.setAuthUserData(null, null, null, false)) 
  }
}

export default authReducer