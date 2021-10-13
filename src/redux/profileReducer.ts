import { postType, profileType, photosType} from './../types/types';
import { BaseThunkType, inferActiosTypes } from './redux-store';
import { profileAPI } from '../components/api/profileApi.ts';

type ActionsType = inferActiosTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
export type InitialaseStateType = typeof  initialaseState

let initialaseState = {
  posts: [] as Array<postType>,
  profile: null as profileType | null,
  status: "" as string | null,
}

const profileReducer = (state = initialaseState, action: ActionsType):InitialaseStateType => {
  switch (action.type) {
    case 'ADD_POST': {
      let body = action.newPostText
      return {
        ...state,
        posts: [...state.posts, {id: 5, text: body, likes: 0}]
      }
    }
    case 'SET_USER_PROFILE': {
      return {...state, profile: action.profile}
    }
    case 'SET_STATUS': {
      return {...state, status: action.status}
    }
    case 'SET_PHOTO_SUCCESS': {
      return {...state, profile: {...state.profile, photos: action.photos} as profileType}
    }
    default: {
      return state
    }
  }
} 

export const actions = {
  addPostAC: (newPostText: string) => ({type: 'ADD_POST', newPostText} as const),
  setUserProfile: (profile: profileType) => ({type: 'SET_USER_PROFILE', profile} as const),
  setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),
  savePhotoSuccess: (photos: photosType) => ({type: 'SET_PHOTO_SUCCESS', photos} as const),
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfile(userId)
  dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getStatus(userId)
  dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  const data = await profileAPI.updateStatus(status)
  
  if (data.resultCode === 0) {
    dispatch(actions.setStatus(status))
  }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  const data = await profileAPI.savePhoto(file)
  
  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos))
  }
}

export const saveProfile = (profile: profileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId
  const data = await profileAPI.saveProfile(profile)
  if (data.resultCode === 0) {
    userId ? dispatch(getUserProfile(userId)) : console.error("user id can't be null")
  } else console.error("Wrong validation of reqwest")
}
  
export default profileReducer 