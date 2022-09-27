import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
  //count : 0,
  cart : localStorage.getItem('menu-cart') != undefined ? JSON.parse(localStorage.getItem('menu-cart')) : []
}
function reducer(state=initialState, action) {
  console.log(state)
  switch (action.type) {
  /*  case 'INC':
      return {...state, count:state.count+action.payload}
    case 'DEC':
      return {...state, count:state.count-action.payload} */
    case 'ADDTOCART' :
      return {...state, cart:action.payload} 
    default:
      return state
  }
}

// creating centralized store for application
const store = createStore(reducer)


ReactDOM.render(
  <BrowserRouter>
<React.StrictMode>
    <Provider store={store}>
  <App />
  </Provider>
  </React.StrictMode>
  </BrowserRouter>,

document.getElementById('root')
);





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
