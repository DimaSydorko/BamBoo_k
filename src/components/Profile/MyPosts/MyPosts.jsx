import React from 'react';
import { addPostActionCreator, updateNewPostImputActionCreator } from '../../../redux/state';
import s from './MyPosts.module.css';
import Post from './Post/Post';


const MyPosts = (props) => {
  
  let PostEl = props.dataPost.map(post => 
    <Post Message={post.text} 
          LikeCount={post.likes}/>)
  
  let newPostElement = React.createRef()

  let addPost = () => props.dispatch(addPostActionCreator())

  let postUpdate = () => {
    let text = newPostElement.current.value
    props.dispatch(updateNewPostImputActionCreator(text))
  }

  return (
    <div className={s.allPosts}>
      Write new post
      <div className={s.inputPostArea}>
        <textarea onChange={postUpdate} ref={newPostElement}/>
      </div>

      <div className={s.addPostButton}>
        <button onClick={addPost}>Add post</button>
      </div>

      <div>
        Your posts
      </div>

      {PostEl}
    </div>
  )
}
export default MyPosts;