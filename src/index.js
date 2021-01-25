import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let dataPost = [
  {id:"1", text:"It is my first post.", likes:"20"},
  {id:"2", text:"How are you?", likes:"15"},
  {id:"3", text:"I feel good!", likes:"55"}
]

let dataPeople = [
  {id:"1", name:"Viktor"},
  {id:"2", name:"Oleg"},
  {id:"3", name:"Nelia"},
  {id:"4", name:"Mam"},
  {id:"5", name:"Tomas"},
]

let dataMessages = [
  {id:"1", text:"Hi bro"},
  {id:"2", text:"How are you?"},
  {id:"3", text:"Write me back as soon as possible"}
]

ReactDOM.render(
  <React.StrictMode>
    <App dataPost={dataPost} dataPeople={dataPeople} dataMessages={dataMessages}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
