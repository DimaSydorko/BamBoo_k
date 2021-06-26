import React from 'react';
import { FilterType } from '../../redux/peopleReducer';
import { userType } from '../../types/types';
import Paginator from '../common/Paginator/Paginator';
import styles from './People.module.css';
import User from './User';
import UserSearchForm from './UserSearchForm';

type propsType = {
  totalUserCount: number
  pageSize: number
  currentPage: number 
  users: Array<userType>
  followingInProgress: Array<number>
  onFilterChanged: (filter: FilterType) => void
  follow: (userId: number) => void
  unFollow: (userId: number) => void
  onPageChanged: (pageNumber: number) => void
}

let People: React.FC<propsType> = ({totalUserCount, pageSize, currentPage, onPageChanged, users, ...props}) => {
  return (
    <div className={styles.userContainer}>
       <Paginator totalItemsCount={totalUserCount} currentPage={currentPage} onPageChanged={onPageChanged}/>
      <div>
        <div>
          <UserSearchForm onFilterChanged={props.onFilterChanged}/>
        </div>
        {
            users.map(u => <User user={u} 
              followingInProgress={props.followingInProgress} 
              unFollow={props.unFollow}
              follow={props.follow}
              key = {u.id}/>
            )
        }
      </div>
    </div>
  )
}

export default People