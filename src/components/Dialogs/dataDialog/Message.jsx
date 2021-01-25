import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './../Dialogs.module.css';

const Message = (props) => {
  return(
    <div>
      <div className={s.message}>{props.text}</div>
    </div>
  )
}

export default Message;