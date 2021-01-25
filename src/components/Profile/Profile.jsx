import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css';

const PersonPage = () => {
  return(
    <div>
      <div>
          <img className = {s.userHead} src="https://lh3.googleusercontent.com/P7sY1jGuQEy_tU1Twdr2nk47uIe9NrHPngtjNVIT4Pbr_ueyiHdlBnI9Tjf-7r-2N-op9AyVKmvVXDuBXdkLZn2UkUg=w640-h400-e365-rj-sc0x00ffffff" alt=""></img>
        </div>
        <div>
          <img className={s.ava}src="https://image.freepik.com/free-vector/cute-panda-eat-bamboo-cartoon-icon-illustration-animal-icon-concept-isolated-flat-cartoon-style_138676-1357.jpg" alt=""></img>
        </div>
    </div>
  )
}

const Profile = (props) => {
  return (
    <div className={s.content}>
      <PersonPage/>
      <MyPosts dataPost = {props.dataPost}/>
    </div>
  )
}

export default Profile;