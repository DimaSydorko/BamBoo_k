import { Form, Formik } from 'formik';
import React from 'react';
import { MyTextArea } from '../../common/formControls';
import styles from './MyPosts.module.css';
import Post, { PostPropsType } from './Post/Post';
import { postType } from '../../../types/types';
import * as yup from 'yup';

export type MapPropsType = {
  posts: Array<postType>
}
export type DispatchPropsType = {
  addPost: (newPostText: string) => void
}
type FormValuesType = {
  newPostText: string
}

const validationSchema = yup.object().shape({
  newPostText: yup.string()
  .max(100, 'Too long!'),
})


const MyPosts: React.FC<PostPropsType & MapPropsType & DispatchPropsType> = (props) => {
  let PostEl = props.posts.map(post => 
    <Post Message={post.text} LikeCount={post.likes}/>
  )

  const submit = (formData: FormValuesType) => {
    props.addPost(
      formData.newPostText
    )
  }
  
  return (
    <div className={styles.allPosts}>
      <Formik
        initialValues={{
          newPostText: ''
        }}
        onSubmit={submit}
        validationSchema={validationSchema}>

        {({handleSubmit}) => (
          <Form onSubmit={handleSubmit}>
            Write new post
            <div >
                <MyTextArea
                  name="newPostText"
                  placeholder={"Write a post..."}
                  className={styles.inputPostArea}
                />
            </div>
            <div className={styles.addPostButton}>
              <button type={"submit"}>Add post</button>
            </div>
          </Form>
        )}
      </Formik>

      <div>
        Your posts 
      </div>
      {PostEl}
    </div>
  )
}
export default MyPosts;