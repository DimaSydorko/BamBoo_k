import React, { FC, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChatMessageT, sendMessage, startMessagesListening, stopMessagesListening } from "../../redux/chatReducer"
import { AppStateType } from "../../redux/redux-store"

const ChatPage:FC = () => {
  return <>
    <Chat/>
  </>
}

const Chat:FC = () => {
  const dispatch = useDispatch()
  const status = useSelector((state: AppStateType) => state.chat.status)
  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [dispatch])

  return <>
    {status === 'error' 
      ? <div>Some error! Refresh page</div> 
      : <>
        <Mesages/>
        <AddMesageForm/>
      </>
    }
  </>
}

const Mesages:FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages)
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
    }
  }, [messages, isAutoScroll])

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget
    if (Math.abs(element.scrollHeight - element.scrollTop) - element.clientHeight < 300){
      !isAutoScroll && setIsAutoScroll(true)
    } else {
      isAutoScroll && setIsAutoScroll(false)
    }
  }

  return <>
    <div style={{height: '750px', overflowY: 'auto'}} onScroll={scrollHandler}>
      {messages.map((m) => <Mesage message={m} key={m.id}/>)}
      <div ref={messagesAnchorRef}></div>
    </div>
  </>
}

type MesageT = {
  message: ChatMessageT
}
const Mesage:FC<MesageT> = React.memo(({message}) => {
  return <>
    <img src={message.photo} alt=""/>
    <br/>
    <div>{message.userName}</div>
    <div>{message.message}</div>
    <hr/>
  </>
})


const AddMesageForm:FC = () => {
  const status = useSelector((state: AppStateType) => state.chat.status)
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  const sendMessageHandler = () => {
    if (!message) {
      return
    } 
    dispatch(sendMessage(message))
    setMessage('')
  }

  return <>
    <span>
      <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
      <button onClick={sendMessageHandler} disabled={status !== 'ready'}>Send</button>
    </span>
  </>
}

export default ChatPage