import { connect } from 'react-redux';
import { compose } from 'redux';
import { actions } from '../../../redux/profileReducer';
import { AppStateType } from '../../../redux/redux-store';
import MyPosts from './MyPosts';
import { MapPropsType, DispatchPropsType } from './MyPosts';

const MapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  } 
}

export default compose<React.ComponentType>(
  connect<MapPropsType, DispatchPropsType, {}, AppStateType>
  (MapStateToProps, {addPost: actions.addPostAC})
) (MyPosts)