import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom'

import './semantic-ui-css/semantic.min.css';
import './index.css';

import App from './App';
import Footer from './components/Footer'

import { Provider } from 'react-redux'
import rootReducer from './reducers/index'
import { createStore } from 'redux'


const store = createStore(
  rootReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


ReactDOM.render(
  <Provider store={store}>
    {/* <BrowserRouter> */}
      <App />
      {/* <Footer/> */}
    {/* </BrowserRouter>, */}
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
