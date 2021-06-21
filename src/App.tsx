import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, Switch, withRouter } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/appReducer';
import Preloader from './components/common/Preloader';
import { withSuspense } from './components/hoc/withSuspense';
import { AppStateType } from './redux/redux-store';
const ProfileContainer = React.lazy(() => import ('./components/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import ('./components/Dialogs/DialogsContainer'))
const PeopleContainer = React.lazy(() => import ('./components/People/PeopleContainer'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedPeaple = withSuspense(PeopleContainer)

class App extends Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    console.error("Some error occured")
  }
  
  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  }
  componentWillUnmount(){
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  }
  
  render() {
    if (!this.props.initialized){
      return <Preloader/>
    }
  
    return (
      <div className='boody'>
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar /> 
          <div className='app-wrapper-content'>
            <Switch>
              <Route path='/profile/:userId?' render={() => <SuspendedProfile/>}/>
              <Route path='/dialogs' render={() => <SuspendedDialogs/>}/> 
              <Route path='/people' render={() => <SuspendedPeaple/>}/>
              <Route path='/login' render={() => <Login/>}/>
              <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
            </Switch>
          </div>
        </div>
      </div>
    )  
  } 
} 

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

export default compose<React.ComponentType>(
  withRouter, 
  connect(mapStateToProps, {initializeApp})) (App);