import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
  return (
    <div className={s.postBox}>
      <div className={s.post}>
        Post:
          <div>
            {props.Message}
          </div>
        <div>
          <span>like: {props.LikeCount} </span>
        </div>
    </div>
  </div>
  )
}
export default Post;