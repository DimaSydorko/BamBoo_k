import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { AppStateType } from "../../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth
} as MapPropsType)

type MapPropsType = {
  isAuth: boolean
}

export function withAuthRedirect<WCP> (WrappedComponent: React.ComponentType<WCP>) {
  const RedirectComponent: React.FC<MapPropsType> = (props) => {
    let {isAuth, ...restProps} = props

    if (!isAuth) return <Redirect to='/login'/>
    return <WrappedComponent {...restProps as WCP}/>
  }

  let ConnectAuthRedirectComponent = connect<MapPropsType, {}, WCP, AppStateType>(
    mapStateToPropsForRedirect, {}) 
  (RedirectComponent)
  
  return ConnectAuthRedirectComponent 
}