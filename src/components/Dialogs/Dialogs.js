import React from 'react';
import { addMessageActionCreator, updateNewMessageImputActionCreator } from '../../redux/state';
import Person from './dataDialog/DialogItem';
import Message from './dataDialog/Message';
import s from './Dialogs.module.css';

const Dialogs = (props) => {
  
  let dialogData = props.dataDialogs.PeopleState.map(dialog => 
  <Person name={dialog.name} id={dialog.id} avaImg={dialog.ava}/>)
  let MessageItem = props.dataDialogs.MessagesState.map(messages => 
  <Message text={messages.text} from={messages.from}/>)
  
  let newMessageElement = React.createRef()
  
   
  let sendMassege = () => props.dispatch(addMessageActionCreator())
    
  let messageUpdate = () => {
    let newMessageInput = newMessageElement.current.value
    props.dispatch(updateNewMessageImputActionCreator(newMessageInput))
  }


  return (
    <div className={s.dialogs}>
      
      <div className={s.people}>
        {dialogData}
      </div>

      <div clasName={s.messages}>
        {MessageItem}
      </div>

      <div className={s.addMessage}>
        <div>
          <textarea onChange={messageUpdate} ref={newMessageElement}></textarea>
        </div>
        <div>
          <button onClick={sendMassege}>Send</button>
        </div>
      </div>
    </div>
  )
}
export default Dialogs;