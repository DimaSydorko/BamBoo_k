import React from 'react';
import { connect } from 'react-redux';
import {requestUsers, follow, unFollow, FilterType} from '../../redux/peopleReducer';
import People from './People';
import Preloader from '../common/Preloader';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { getUsers, getPageSize, 
  getTotalUsersCount, getCurrentPage, 
  getIsFetching, getFollowingInProgress, getUsersFilter } from '../../redux/peopleSelector';
import { userType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';
import { withRouter } from 'react-router';

type mapStatePropsTypes = {
  totalUserCount: number
  pageSize: number
  currentPage: number
  isFetching: boolean
  users: Array<userType> 
  followingInProgress: Array<number>
  filter: FilterType
}
type mapDispatchPropsTypes = {
  requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
  follow: (userId: number) => void
  unFollow: (userId: number) => void
}
type ownPropsTypes = {}
type propsTypes = mapStatePropsTypes & mapDispatchPropsTypes & ownPropsTypes

class PeopleContainer extends React.Component<propsTypes> {
  componentDidMount(){
    let {currentPage, pageSize, filter} = this.props
    this.props.requestUsers(currentPage, pageSize, filter)
  }

  onPageChanged = (pageNumber: number) => {
    const {pageSize, filter} = this.props
    this.props.requestUsers(pageNumber, pageSize, filter)
  }
  
  onFilterChanged = (filter: FilterType) => {
    const {pageSize} = this.props
    this.props.requestUsers(1, pageSize, filter)
  }

  render()  {
    return <>
     {this.props.isFetching ? <Preloader/> : null}

    <People totalUserCount={this.props.totalUserCount} 
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            users={this.props.users}
            onFilterChanged={this.onFilterChanged}
            follow={this.props.follow}
            unFollow={this.props.unFollow}
            onPageChanged={this.onPageChanged}
            followingInProgress={this.props.followingInProgress}
      />
    </>
  }
}

let mapStateToProps = (state: AppStateType): mapStatePropsTypes => ({
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUserCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state)
})

export default compose<React.ComponentType> (
  connect<mapStatePropsTypes, mapDispatchPropsTypes, ownPropsTypes, AppStateType>(
    mapStateToProps, {follow, unFollow, requestUsers}),
    withRouter,
    withAuthRedirect
) (PeopleContainer)