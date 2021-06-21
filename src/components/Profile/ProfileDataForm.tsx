import { Field, Form, Formik } from 'formik';
import React from 'react';
import styles from './Profile.module.css';
import {MyInput, MyTextArea} from '../common/formControls';
import * as yup from 'yup';
import { profileType } from '../../types/types';

type PropsType = {
  initualValues: profileType
  profile: profileType
  onSubmit: (formData: any) => void
}

const validationSchema = yup.object().shape({
  fullName: yup.string()
    .min(2, 'Too short!')
    .max(20, 'Too Long!')
    .required('Required'),
  lookingForAJobDescription: yup.string()
    .max(50, 'Too Long!')
    .required('Required'),
  aboutMe: yup.string()
    .max(50, 'Too Long!')
    .required('Required'),
})


const ProfileDataForm: React.FC<PropsType> = ({initualValues, profile, onSubmit}) => {
  return (
    <Formik
    initialValues={initualValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}>

      {({handleSubmit, isSubmitting, handleChange, touched, errors}) => (

        <Form onSubmit={handleSubmit} className={styles.descriptionBlock}> 
          <div>
            <button type="submit" disabled={isSubmitting}>Save</button>
          </div>
          <div className={styles.name}>
            <b>{profile.fullName}</b>
            <MyInput
              name="fullName"
              placeholder="Full name"
            />
          </div>
          <div>
            <b>About me</b>: {profile.aboutMe}
            <MyTextArea
              name="aboutMe"
              placeholder="About"
            />
          </div>
          <div>
            <b>Look For Job</b>: {profile.lookingForAJob ? " Yes" : " No"}
            <Field 
              type={"checkbox"}
              name={"lookingForAJob"}
              onChange={handleChange}
              /> 
          </div>
          <div>
            <b>Whot I know</b>: {profile.lookingForAJobDescription}
            <MyTextArea
              label="Skills"
              name="lookingForAJobDescription"
              placeholder="Skills"
            />
          </div>
          <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
              return <div className={styles.contact}>
                <b>{key}:{
                  <MyInput
                    name={"contacts." + key}
                    placeholder={key}
                  />
                }</b>
                {errors.contacts && touched.contacts ? (
                  <div>{errors.contacts}</div>
                ):null}
              </div>
            })}
          </div> 
        </Form>
      )}
    </Formik>
    )
}

export default ProfileDataForm