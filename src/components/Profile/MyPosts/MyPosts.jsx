import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

let dataPost = [
  {id:"1", text:"It is my first post.", likes:"20"},
  {id:"2", text:"How are you?", likes:"15"}
]

let PostEl = dataPost.map(post => <Post Message={post.text} LikeCount={post.likes}/>)

const MyPosts = () => {
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