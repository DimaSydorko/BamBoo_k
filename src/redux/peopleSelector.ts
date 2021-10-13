import { createSelector } from "reselect"
import { AppStateType } from "./redux-store"

const getUsersSelector = (state: AppStateType) => {
  return state.peoplePage.users
}

export const getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter(u => true)
})

export const getPageSize = (state: AppStateType) => {
  return state.peoplePage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
  return state.peoplePage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
  return state.peoplePage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
  return state.peoplePage.isFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
  return state.peoplePage.followingInProgress
}

export const getUsersFilter = (state: AppStateType) => {
  return state.peoplePage.filter
}