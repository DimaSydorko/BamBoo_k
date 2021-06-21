import React from 'react';
import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo';
import { profileType } from '../../types/types';

export type ProfilePropsType = {
  status: string | null
  profile: profileType | null
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: profileType) => Promise<any> 
  updateStatus: (status: string) => void
}

const Profile: React.FC<ProfilePropsType> = (props) => {
  return (
    <div className={s.content}>
      <ProfileInfo  
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
        updateStatus={props.updateStatus}/>
      <MyPostsContainer/> 
    </div>
  )
}

export default Profile;