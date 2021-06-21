import { useField } from 'formik';
import React from 'react';
import styles from './formControlsStyle.module.css';

type MyInputType = {
  label?: string
  name: string
  id?: string
  placeholder?: string
  className?: any
}

export const MyInput: React.FC<MyInputType> =({label, ...props}) => {
  const[field, meta] = useField(props)
  return (
    <div className={styles.formControl}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props}/>
        {meta.touched && meta.error ? (
          <div className={styles.error}>{meta.error}</div>
        ):null}  
    </div>
  )
}

export const MyTextArea: React.FC<MyInputType> = ({label, ...props}) => {
  const[field, meta] = useField(props)
  return (
    <div className={styles.formControl}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea {...field} {...props}/>
        {meta.touched && meta.error ? (
          <div className={styles.error}>{meta.error}</div>
        ):null}  
    </div>
  )
}