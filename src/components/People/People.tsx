import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { FilterType, requestUsers } from '../../redux/peopleReducer'
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/peopleSelector'
import Paginator from '../common/Paginator/Paginator'
import styles from './People.module.css'
import User from './User'
import * as queryString from 'querystring'
import UserSearchForm from './UserSearchForm'

type QueryParamsT = {
  term?: string
  page?: string
  friend?: string
}

export const People = () => {
  const totalUsersCount = useSelector(getTotalUsersCount)
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)
  const users = useSelector(getUsers)
  const filter = useSelector(getUsersFilter)
  const followingInProgress = useSelector(getFollowingInProgress)
  
  const dispatch = useDispatch()
  const history = useHistory()


  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsT

    let actualPage = currentPage
    let actualFilter = filter
    
    if(!!parsed.page) actualPage = Number(parsed.page)
    if(!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

    switch (parsed.friend) {
      case 'null':
        actualFilter = {...actualFilter, friend: null}
        break
      case 'true':
        actualFilter = {...actualFilter, friend: true} 
        break
      case 'false':
        actualFilter = {...actualFilter, friend: false}
        break
    }

    dispatch(requestUsers(actualPage, pageSize, actualFilter))
  }, [currentPage, pageSize, filter, dispatch, history])
  
  useEffect(() => {
    const query: QueryParamsT = {}

     if (!!filter.term) query.term = filter.term
     if (filter.friend) query.friend = String(filter.friend)
     if (currentPage !== 1) query.page = String(currentPage)

    history.push({
      pathname: '/people',
      search: queryString.stringify(query)
    })
  }, [filter, currentPage, history])
  

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter))
  }
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter))
  }
  const follow = (userId: number) => {
    dispatch(follow(userId))
  }
  const unFollow = (userId: number) => {
    dispatch(unFollow(userId))
  }
  

  return (
    <div className={styles.userContainer}>
      <Paginator 
        totalItemsCount={totalUsersCount} 
        currentPage={currentPage} 
        onPageChanged={onPageChanged}
      />
      <UserSearchForm onFilterChanged={onFilterChanged}/>

      {users.map(u => <User user={u} 
          followingInProgress={followingInProgress} 
          unFollow={unFollow}
          follow={follow}
          key={u.id}/>
      )}
    </div>
  )
}

export default People