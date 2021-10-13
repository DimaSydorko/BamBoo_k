import React from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { login } from "../../redux/authReducer";
import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { MyInput } from '../common/formControls';
import styles from './login.module.css';
import { AppStateType } from '../../redux/redux-store';

type mapStateToPropsType = {
  isAuth: boolean
  captchaUrl: string | null
  loginError: string | null
}
type MapDispatchToPropstype = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null) => void
}
type loginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string | null
} 

const validationSchema = yup.object().shape({
  email: yup.string()
    .email('Invalid email')
    .required('Required'),
  password: yup.string()
    .required('Required')
    .min(6, 'Too easy!')
    .max(20, 'Too Long!'),
})

const Login: React.FC<mapStateToPropsType & MapDispatchToPropstype> = (props) => {
 if (props.isAuth) {
   return <Redirect to={"/profile"}/>
 }

  const submit = (formData: loginFormValuesType) => {
    props.login(
      formData.email, 
      formData.password, 
      formData.rememberMe, 
      formData.captcha
    )
  }
  return(
    <Formik 
      initialValues={{
        email: '',
        password: '',
        rememberMe: false,
        captcha: '',
      }}
      validationSchema={validationSchema}
      onSubmit={submit}>
        {({handleSubmit, handleChange, touched, errors}) => (
          <Form onSubmit={handleSubmit}>
            <label>Login</label>
            <div>
              <MyInput
                name="email"
                placeholder="Email"
              />
            </div>
            <div>
              <Field 
                type={"password"}
                name={"password"}
                placeholder={"Password"}  
                onChange={handleChange}
                />{errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
            </div>
            <div>
              Remember? 
            <Field 
                type={"checkbox"}
                name={"rememberMe"}
                onChange={handleChange}
                />
              </div>
            <div>
              <div className={styles.error}>
                {props.loginError}  
              </div>
                <button type="submit">Login</button>
            </div>
            {props.captchaUrl && 
            <div>
              <img src={props.captchaUrl} alt=''/>
              <div>
                <MyInput
                  name="captcha"
                  placeholder="Symbols from image"
                />
              </div>
            </div>}
          </Form>
        )}
    </Formik>
  )
}
const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
  loginError: state.auth.loginError,
})
export default connect(mapStateToProps, { login } )(Login)
