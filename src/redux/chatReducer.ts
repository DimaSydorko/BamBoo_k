import { chatApi, StatusT, ChatMessageApiT } from './../components/api/chatApi'
import { BaseThunkType, inferActiosTypes as InferActiosTypes } from "./redux-store"
import { Dispatch } from 'redux'
import { v1 } from 'uuid'

type InitialeStateType = typeof initialState
type ActionsType = InferActiosTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export type ChatMessageT = ChatMessageApiT & {id: string}

let initialState = {
  messages: [] as ChatMessageT[],
  status: 'pending' as StatusT
}

const chatReducer = (state = initialState, action: ActionsType): InitialeStateType => {
  switch (action.type) {
    case 'MESSAGES_RECEIVED': {
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id:v1() }))]
          .filter((m, i, a) => i >= a.length - 100)
      }
    }
    case 'STATUS_CHANGED': {
      return {
        ...state,
        status: action.payload.status
      }
    }
    default: 
      return state
  }
}

export const actions = {
  messageReceived: (messages: ChatMessageApiT[]) => ({type: 'MESSAGES_RECEIVED', payload: {messages}} as const),
  statusChenged: (status: StatusT) => ({type: 'STATUS_CHANGED', payload: {status}} as const),
}

let _newMessageHandler: ((messages: ChatMessageApiT[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => dispatch(actions.messageReceived(messages))
  }
  return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusT) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => dispatch(actions.statusChenged(status))
  }
  return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatApi.start()
  chatApi.subscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatApi.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatApi.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatApi.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
  chatApi.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chatApi.sendMessage(message)
}

export default chatReducer