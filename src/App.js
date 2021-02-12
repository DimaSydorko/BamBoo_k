import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import { BrowserRouter, Route } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';

const App = (props) => {
  return (
    <BrowserRouter>
      <div className='boody'>
        <div className="app-wrapper">
          <Header />
          <Navbar dataDialogs={props.store.state.dataDialogsPage.PeopleState}/> 
          <div className='app-wrapper-content'>
            <Route path='/profile' render={() => <Profile dataPost={props.store.state.dataProfilePage} 
                                                          addPost={props.store.addPost} 
                                                          updateNewPostInput={props.store.updateNewPostInput}/>}/>
            <Route path='/dialogs' render={() => <Dialogs dataDialogs={props.store.state.dataDialogsPage}/>}/>
            <Route path='/news' component={News}/>
            <Route path='/music' component={Music}/>
            <Route path='/settings' component={Settings}/>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
} 

export default App;
