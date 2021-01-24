import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Dialogs.module.css';

const Person = (props) => {
  return(
    <div>
      <div className={s.person}>
          <NavLink to={"/dialogs/"+props.id} activeClassName={s.activeLink}>{props.name}</NavLink>
        </div>
    </div>
  )
}

const Message = (props) => {
  return(
    <div>
      <div className={s.message}>{props.text}</div>
    </div>
  )
}

let dataPeople = [
  {id:"1", name:"Viktor"},
  {id:"2", name:"Oleg"},
  {id:"3", name:"Nelia"},
  {id:"4", name:"Mam"},
  {id:"5", name:"Tomas"},
]

let dataMessages = [
  {id:"1", text:"Hi bro"},
  {id:"2", text:"How are you?"},
  {id:"3", text:"Write me back as soon as possible"}
]

let DialogEl = dataPeople.map(dialog => <Person name={dialog.name} id={dialog.id}/>)

let MessageEl = dataMessages.map(messages => <Message text={messages.text}/>)

const Dialogs = (props) => {
  return (
    <div className={s.dialogs}>
      <div className={s.people}>
        {DialogEl}
      </div>
      <div clasname={s.messages}>
        {MessageEl}
      </div>
    </div>
  )
}

export default Dialogs;