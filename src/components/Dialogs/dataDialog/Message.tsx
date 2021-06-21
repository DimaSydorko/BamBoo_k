import React from 'react';
import s from './../Dialogs.module.css';

type MessagePropsType = {
  from: string 
  message: string
}

const Message: React.FC<MessagePropsType> = (props) => {
  let MessageCSS = props.from === "you" ? s.messageYou : s.message;
  
  return(
    <div className={s.overMessage}>
      <div className={MessageCSS}>
        <div className={s.massegeText}>
          {props.message}
        </div>
      </div>
    </div>
  )
}

export default Message;