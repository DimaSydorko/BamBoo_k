import { applyMiddleware, combineReducers, createStore, compose, Action } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import authReducer from "./authReducer";
import dialogReducer from "./dialogReducer";
import peopleReducer from "./peopleReducer";
import profileReducer from "./profileReducer";
import appReducer from "./appReducer";

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogReducer,
  peoplePage: peopleReducer,
  auth: authReducer,
  app: appReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
// @ts-ignore
window.__store__ = store

export default store

type rootReducerType = typeof rootReducer
export type AppStateType = ReturnType<rootReducerType>
export type inferActiosTypes<T> = T extends  {[keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThynkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>