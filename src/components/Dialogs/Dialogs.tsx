import React from 'react';
import Person from './dataDialog/DialogItem';
import Message from './dataDialog/Message';
import styles from './Dialogs.module.css';
import * as yup from 'yup';
import { initialaseStateType } from '../../redux/dialogReducer';
import { MyInput } from '../common/formControls';
import { Form, Formik } from 'formik';

type DialogsPropsType = {
  dialogsPage: initialaseStateType
  addMessageAC: (values: string) => void
}
type FormValuesType = {
  messageText: string
}

const validationSchema = yup.object().shape({
  messageText: yup.string()
  .required('First write your message!')
  .max(90,'Too long!'),
})

const Dialogs: React.FC<DialogsPropsType> = (props) => {
  let state = props.dialogsPage
  let dialogData = state.PeopleState.map(dialog => 
    <Person name={dialog.name} id={dialog.id} avaImg={dialog.ava}/>)
  let MessageItem = state.MessagesState.map(messages => 
    <Message message={messages.message} from={messages.from}/>)
  
  const submit = (formData: FormValuesType) => {
    props.addMessageAC(formData.messageText)
  }
  return (
    <div className={styles.dialogs}>
      <div className={styles.people}>
        {dialogData}
      </div>
      <div className={styles.messages}>
        {MessageItem}
      </div>

      <Formik 
        initialValues={{messageText: ''}}
        onSubmit={submit}
        validationSchema={validationSchema}>
          
        {({handleSubmit}) => (
          <Form onSubmit={handleSubmit}>
            <MyInput
              name='messageText'
              placeholder='Write a message...'
              className={styles.inputMessageArea}
            />
            <div className={styles.addMessageButton}>
              <button type="submit">Send</button>
            </div>
          </Form>
        )}
      </Formik>

    </div>
  )
}
export default Dialogs;