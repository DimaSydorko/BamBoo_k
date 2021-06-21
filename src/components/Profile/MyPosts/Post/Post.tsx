import React from 'react';
import styles from './Post.module.css';

export type PostPropsType = {
  Message: string
  LikeCount: number|null
}

const Post: React.FC<PostPropsType> = (props) => {
  return (
    <div className={styles.postBox}>
      <div className={styles.post}>
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