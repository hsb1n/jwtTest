import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import 'antd/dist/antd.css';
import { applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';
import {createStore} from 'redux';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore);
// createStore는 객체밖에 못 받기 때문에 promise와 function도 받을 수 있게 만들어줌

ReactDOM.render(
<Provider store ={createStoreWithMiddleware(Reducer,
  // dev tool을 application에 연결하기 위함
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
  )}>
  <App />

</Provider>,
  document.getElementById('root')
  
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

//image 파일을 넣을땐 src 폴더에 넣어서 webpack이 작용할 수 있게 한다.

// redux extension -> 