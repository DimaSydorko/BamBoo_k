import { getAuthUserData } from "./authReducer"
import { inferActiosTypes } from "./redux-store"

let initialaseState = {   
 initialized: false,
}
export type initialaseStateType = typeof initialaseState
type actionsType = inferActiosTypes<typeof actions>

const appReducer = (state = initialaseState, action: actionsType): initialaseStateType => {
  switch (action.type) {
    case 'INITIALIZED_SUCCSESS': {
      return {
        ...state,
        initialized: true,
      }
    }
    default: 
      return state
  }
}

export const actions = {
  initializedSuccess: () => ({type: 'INITIALIZED_SUCCSESS'} as const)
}

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData())
  Promise.all([promise])
    .then(() => {
      dispatch(actions.initializedSuccess())
  })
}

export default appReducer