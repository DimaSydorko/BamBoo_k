import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';


const MyPosts = (props) => {
  
  let PostEl = props.dataPost.map(post => <Post Message={post.text} LikeCount={post.likes}/>)
  
  return (
    <div className={s.profile}>
    posts
    <div>
      new posts
    </div>
    {PostEl}
    </div>
  )
}
export default MyPosts;