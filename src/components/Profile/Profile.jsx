import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css';
import profileHeader from '../../Image/ProfileHeader.jpg';

const PersonPage = () => {
  return(
    <div>
      <div>
        <img className = {s.userHead} src={profileHeader} alt=""></img>
      </div>
      <div className={s.aboutYouBox}>
        <img className={s.ava}src="https://image.freepik.com/free-vector/cute-panda-eat-bamboo-cartoon-icon-illustration-animal-icon-concept-isolated-flat-cartoon-style_138676-1357.jpg" alt=""></img>
      </div>
    </div>
  )
}
const Profile = (props) => {
  return (
    <div className={s.content}>
      <PersonPage/>
      <MyPosts dataPost={props.dataPost.PostState} 
                NewPostInput={props.dataPost.NewPostInput} 
                addPost={props.addPost} 
                updateNewPostInput={props.updateNewPostInput}/>
    </div>
  )
}

export default Profile;