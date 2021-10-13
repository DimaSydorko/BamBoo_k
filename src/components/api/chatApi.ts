export type ChatMessageApiT = {
  userId: number
  photo: string
  message: string
  userName: string
}
export type StatusT = 'pending' | 'ready' | 'error'

type MessagesReceivedSubscriberT = (messages: ChatMessageApiT[]) => void
type StatusChengedSubscriberT = (status: StatusT) => void
type EventsNamesT = 'messages-received' | 'status-changed'

let subscribers = {
  'messages-received': [] as MessagesReceivedSubscriberT[],
  'status-changed': [] as StatusChengedSubscriberT[],
}

let ws: WebSocket | null
const closeHangler = () => {
  notifiSubscribersAboutStatus('pending')
  setTimeout(createChanel, 3000)
}
const messageHandler = (e: MessageEvent) => {
  let newMessages = JSON.parse(e.data)
  subscribers['messages-received'].forEach(s => [s(newMessages)])
}
const openHandler = () => {
  notifiSubscribersAboutStatus('ready')
}
const errorHandler = () => {
  notifiSubscribersAboutStatus('error')
  console.error('Refresh page!')
  
}

const cleanUp = () => {
  ws?.removeEventListener('close', closeHangler)
  ws?.removeEventListener('message', messageHandler)
  ws?.removeEventListener('open', openHandler)
  ws?.removeEventListener('error', errorHandler)
}

const notifiSubscribersAboutStatus = (status: StatusT) => {
  subscribers['status-changed'].forEach(s => s(status))
}

function createChanel() {
  if (ws !== null) {
    cleanUp()
    ws?.close()
  }
  notifiSubscribersAboutStatus('pending')
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  ws.addEventListener('close', closeHangler)
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('open', openHandler)
  ws.addEventListener('error', errorHandler)
}

export const chatApi = {
  start() {
    createChanel()
  },
  stop() {
    subscribers['messages-received'] = []
    subscribers['status-changed'] = []
    cleanUp()
    ws?.close()
  },
  subscribe(eventName: EventsNamesT, callBack: MessagesReceivedSubscriberT | StatusChengedSubscriberT) {
    // @ts-ignore
    subscribers[eventName].push(callBack)
    return () => {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(s => s !== callBack)
    }
  },
  unsubscribe(eventName: EventsNamesT, callBack: MessagesReceivedSubscriberT | StatusChengedSubscriberT) {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(s => s !== callBack)
  },
  sendMessage(message: string) {
    ws?.send(message)
  }
}