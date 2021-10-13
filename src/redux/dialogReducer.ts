import { BaseThunkType, inferActiosTypes } from "./redux-store"

type PeopleStateType = {
  id: number
  name: string
  ava: string
}
type MessagesStateType = {
  id: number
  message: string
  from: string
}

let initialaseState = {
  PeopleState: [{
      id: 1,
      name: "Viktor",
      ava: "https://www.whalesharkstudio.com/wp-content/uploads/2015/03/guitarpanda.jpg"
    },
    {
      id: 2,
      name: "Oleg",
      ava: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCeos9PePfuk7TFXmlFYDD-HGbQI8MiF5gKA&usqp=CAU"
    },
    {
      id: 3,
      name: "Nelia",
      ava: "https://newcastlebeach.org/images/panda-vector-2.jpg"
    },
    {
      id: 4,
      name: "Mam",
      ava: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8JeH71Jp2Mh6yIDAHXiQusm83RqBeBzv42Q&usqp=CAU"
    },
    {
      id: 5,
      name: "Tomas",
      ava: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz4ujl0RQRe50orwwLWE6fhpsVIJY3qYvJ1A&usqp=CAU"
    }
  ] as Array<PeopleStateType>,

  MessagesState: [{
      id: 1,
      message: "Hi bro",
      from: "Viktor"
    },
    {
      id: 2,
      message: "How are you?",
      from: "Viktor"
    },
    {
      id: 3,
      message: "Write me back as soon as possible",
      from: "Viktor"
    },
    {
      id: 4,
      message: "Hi I'm here",
      from: "you"
    } 
  ] as Array<MessagesStateType>,
}
export type initialaseStateType = typeof initialaseState
type ActionsType = inferActiosTypes<typeof actions>
export type thunkType = BaseThunkType<ActionsType>

const dialogReducer = (state = initialaseState, action: ActionsType):initialaseStateType => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      let body = action.messageText
      return {
        ...state,
        MessagesState: [...state.MessagesState, {id: 5, message: body, from: "you"}]
      }
      default:
        return state
  }
} 

export const actions ={
  addMessageAC: (messageText: string) => ({type: 'ADD_MESSAGE', messageText} as const),
}


export default dialogReducer