import React, { ChangeEvent, useState } from 'react';
import styles from './Profile.module.css';
import profileHeader from '../../Image/ProfileHeader.jpg';
import Preloader from '../common/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from './../../Image/ava/FrendAva.png';
import ProfileDataForm from './ProfileDataForm';
import { ProfilePropsType } from './Profile';
import { ContactsType as ContactsType, profileType } from '../../types/types';

type ProfileDataPropsType = {
  profile: profileType
  isOwner: boolean
  goToEditMode: () => void
}
type ContactPropstype = {
  contactTytle: string
  contactValue: string
}

const ProfileInfo: React.FC<ProfilePropsType> = ({isOwner, profile, status, updateStatus, savePhoto, saveProfile}) => {
  
  let [editMode, setEditMode] = useState(false)
  
  if (!profile){
    return <Preloader/>
  }
  
  const onSubmit = (formData: profileType) => {
    saveProfile(formData).then(() => {setEditMode(false)})
  } 

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0])
    }
  }
  
  return<>
    <div>
      <img className = {styles.userHead} src={profileHeader} alt=""></img>
    </div>
    <div className={styles.aboutYouBox}>
      <div>
        <img className={styles.ava} src={profile.photos.large || userPhoto}/>
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
      </div>
      <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>

      {editMode 
        ? <ProfileDataForm initualValues={profile} profile={profile} onSubmit={onSubmit}/> 
        : <ProfileData goToEditMode={()=>{setEditMode(true)}} profile={profile} isOwner={isOwner}/>}
    </div>
  </>
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
  return(
    <div className={styles.descriptionBlock}> 
      {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
      <div className={styles.name}>
        {profile?.fullName}
      </div>   
      <div>   
        <b>About me</b>: {profile?.aboutMe}
      </div>   
      <div>
        <b>Look For Job</b>: {profile?.lookingForAJob ? " Yes" : " No"} 
      </div>
      { profile?.lookingForAJob && 
        <div>
          <b>Reason</b>: {profile.lookingForAJobDescription}
        </div>
      }
      <div>
        <b>Contacts</b>: {
        Object
          .keys(profile.contacts)
          .map(key => {
        return <Contact key={key} contactTytle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
      })}
      </div>
    </div>
  )
}

export const Contact: React.FC<ContactPropstype> = ({contactTytle, contactValue}) => {
  return <div className={styles.contact}>{contactTytle}: {contactValue}</div>
}

export default ProfileInfo;