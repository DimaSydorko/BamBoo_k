import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './People.module.css';
import userPhoto from './../../Image/ava/FrendAva.png';
import { userType } from '../../types/types';

type propsType = {
  followingInProgress: Array<number>
  user: userType
  follow: (userId: number) => void
  unFollow: (userId: number) => void
}
const User: React.FC<propsType> = ({user, followingInProgress, unFollow, follow}) => {
  return (
    <div key = {user.id} className={styles.uaserBox}>
      <span>
        <div>
          <NavLink to={`/profile/${user.id}`}>
            <img 
              className={styles.userAva} 
              src={user.photos.small != null ? user.photos.small: userPhoto}
              alt=''
            />
          </NavLink>
        </div>
        <div>
          { user.followed 
            ? <button 
              disabled={followingInProgress.some(id => id === user.id)} 
              onClick={ () => {unFollow(user.id)}}
            >Unfollow</button>
            : <button 
              disabled={followingInProgress.some(id => id === user.id)} 
              onClick={ () => {follow(user.id)}}
            >Follow</button>
          }
        </div>
      </span>
      <span>
        <div>{user.name}</div>
        <div>{user.status}</div>
      </span>
  </div>
  )
}



export default User