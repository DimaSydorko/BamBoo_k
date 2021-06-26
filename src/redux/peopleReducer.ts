import { ResultCodesEnum } from "../components/api/api"
import { usersAPI } from "../components/api/userApi"
import { userType } from "../types/types"
import { updateObjectInArray } from "../utils/objectHelpers"
import { BaseThynkType, inferActiosTypes } from "./redux-store"

type initialaseStateType = typeof initialaseState
export type FilterType = typeof initialaseState.filter
type actionsType = inferActiosTypes<typeof actions>
type thunkType = BaseThynkType<actionsType>

let initialaseState = {   
  users: [] as Array<userType>,
  pageSize: 10 as number,
  totalUsersCount: 10 as number,
  currentPage: 1 as number,
  isFetching: true as boolean,
  followingInProgress: [] as Array<number>, //array of users id
  filter: {
    term: '',
    friend: null as null | boolean
  }
}

const peopleReducer = (state = initialaseState, action: actionsType): initialaseStateType => {
  switch (action.type) {
    case 'FOLLOW': {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: true}) 
      }
    }
    case 'UNFOLLOW': {
      return {
       ...state,
       users: updateObjectInArray(state.users, action.userId, "id", {followed: false}) 
      }
    }
    case 'SET_USERS': {
      return {...state, users: action.users}
    }
    case 'SET_CURRENT_PAGE': { 
      return {...state, currentPage: action.currentPage}
    }
    case 'SET_FILTER': { 
      return {...state, filter: action.payload}
    }
    case 'SET_TOTAL_USERS_COUNT': { 
      return {...state, totalUsersCount: action.count}
    }
    case 'TOGGLE_IS_FECHING': { 
      return {...state, isFetching: action.isFetching}
    }
    case 'TOGGLE_IS_FECHING_PROGRESS': { 
      return {
        ...state,
        followingInProgress: action.isFetching 
        ? [...state.followingInProgress, action.userId] 
        : state.followingInProgress.filter(id => id !== action.userId)
      }
    }
    default: 
      return state
  }
}

export const actions = {
  followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
  unFollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
  setUsers: (users: Array<userType>) => ({type: 'SET_USERS', users} as const),
  setPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
  setFilter: (filter: FilterType) => ({type: 'SET_FILTER', payload: filter} as const),
  setTotalUsersCount: (totalUsersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', count: totalUsersCount} as const),
  toggleIsFeching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FECHING', isFetching} as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'TOGGLE_IS_FECHING_PROGRESS', isFetching, userId} as const),
}


export const requestUsers = (page: number, pageSize: number, filter: FilterType): thunkType => {
    return async (dispatch) => {
      dispatch(actions.toggleIsFeching(true))
      dispatch(actions.setPage(page))
      dispatch(actions.setFilter(filter))

      let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
      dispatch(actions.toggleIsFeching(false))
      dispatch(actions.setUsers(data.items))
      dispatch(actions.setTotalUsersCount(data.totalCount))
    }
  }

const _followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, 
  actionCreator: (userId: number) => actionsType) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
      let response = await apiMethod(userId)

      if (response.data.resultCode === ResultCodesEnum.Error) {
        dispatch(actionCreator(userId))
      }
      dispatch(actions.toggleFollowingProgress(false, userId))
  }

export const follow = (userId: number): thunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.getFollow.bind(usersAPI), actions.followSuccess)
  }
}

export const unFollow = (userId: number): thunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.getUnFollow.bind(usersAPI), actions.unFollowSuccess)
  }
}

export default peopleReducer