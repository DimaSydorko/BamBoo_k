import { Field, Form, Formik } from 'formik';
import React from 'react';
import { userType } from '../../types/types';
import Paginator from '../common/Paginator/Paginator';
import styles from './People.module.css';
import User from './User';
import * as yup from 'yup';

type propsType = {
  totalUserCount: number
  pageSize: number
  currentPage: number 
  onPageChanged: (pageNumber: number) => void 
  users: Array<userType>
  followingInProgress: Array<number>
  follow: (userId: number) => void
  unFollow: (userId: number) => void
}
let People: React.FC<propsType> = ({totalUserCount, pageSize, currentPage, onPageChanged, users, ...props}) => {
  return (
    <div className={styles.userContainer}>
       <Paginator totalItemsCount={totalUserCount} currentPage={currentPage} onPageChanged={onPageChanged}/>
      <div>
        <div>
          <UserSearchForm/>
        </div>
        {
            users.map(u => <User user={u} 
              followingInProgress={props.followingInProgress} 
              unFollow={props.unFollow}
              follow={props.follow}
              key = {u.id}/>
            )
        }
      </div>
    </div>
  )
}


const validationSchema = yup.object().shape({
  term: yup.string()
    .required('Required')
})

type UserSearchObjectType = {
  term: string
}

const UserSearchForm = () => {
  const submit = (values: UserSearchObjectType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
    setTimeout(() => {
      alert(values)
    })
  }

  return <>
    <Formik 
      initialValues={{
        term: '',
      }}
      validationSchema={validationSchema}
      onSubmit={submit}>
    
        {({handleSubmit, handleChange, touched, errors}) => (
          <Form onSubmit={handleSubmit}>
            <label>Search</label>
              <Field 
                type={"text"}
                name={"term"}
                placeholder={"Search..."}  
                onChange={handleChange}
                />{errors.term && touched.term ? (
                  <div>{errors.term}</div>
                ) : null}
              <button>Search</button>
          </Form>
        )}

    </Formik>
  </>
}

export default People