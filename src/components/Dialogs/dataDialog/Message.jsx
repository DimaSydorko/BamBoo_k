import React from 'react';
import s from './../Dialogs.module.css';

const Message = (props) => {
  let MessageCSS = props.from === "you" ? s.messageYou : s.message;
  
  return(
    <div className={s.overMessage}>
      <div className={MessageCSS}>
        <div className={s.massegeText}>
          {props.text}
        </div>
      </div>
    </div>
  )
}

export default Message;