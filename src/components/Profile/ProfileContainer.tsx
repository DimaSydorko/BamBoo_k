import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile} from '../../redux/profileReducer';
import Profile from './Profile';
import { AppStateType } from '../../redux/redux-store';
import { profileType } from '../../types/types';

type DispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void 
  updateStatus: (status: string) => void
  savePhoto:  (file: File) => void
  saveProfile: (profile: profileType) => Promise<any>
}
type PathParamsType = {
  userId: string
}
type MapPropsType = ReturnType<typeof mapStateToProps>
type PropsType = MapPropsType & DispatchPropsType &  RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId: number|null = +this.props.match.params.userId
    if (!userId) {
      userId = this.props.authorizedUserId
        if(!userId) {
          this.props.history.push("/login")
        }
    }
    this.props.getUserProfile(userId as number)
    this.props.getStatus(userId as number)
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: PropsType) {
    if(this.props.match.params.userId !== prevProps.match.params.userId){
      this.refreshProfile()
    }
  }

  render() {
    return<>
      <Profile {...this.props}
        isOwner={!this.props.match.params.userId} 
        profile={this.props.profile} 
        status={this.props.status} 
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}/>
    </>
  }
}

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth  
})

export default compose<React.ComponentType>(
  connect (mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
  withRouter,
  withAuthRedirect
) (ProfileContainer)