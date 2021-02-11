import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {addPost} from './redux/state';
import {updateNewPostInput} from './redux/state';

export let rerenderEntireTree = (state) => {
  ReactDOM.render(
    <React.StrictMode>
      { <App state={state} 
              addPost={addPost} 
              updateNewPostInput={updateNewPostInput}/>}
    </React.StrictMode>,
    document.getElementById('root')
  );
}

