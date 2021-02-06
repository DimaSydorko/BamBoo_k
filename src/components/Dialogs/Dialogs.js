import React from 'react';
import { NavLink } from 'react-router-dom';
import Person from './dataDialog/DialogItem';
import Message from './dataDialog/Message';
import s from './Dialogs.module.css';

const Dialogs = (props) => {
  
  let dialogData = props.dataDialogs.PeopleState.map(dialog => <Person name={dialog.name} id={dialog.id} ava={dialog.ava}/>)
  let MassageItem = props.dataDialogs.MessagesState.map(messages => <Message text={messages.text}/>)
  
  return (
    <div className={s.dialogs}>
      <div className={s.people}>
        {dialogData}
      </div>
      <div clasName={s.messages}>
        {MassageItem}
      </div>
    </div>
  )
}

export default Dialogs;