import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import './index.css';
import App from './App';
import { Provider } from 'react-redux' ;
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from "history";
import '../src/fonts/Vazir.ttf'
import configureStore from "./app/store" ;

const history = createBrowserHistory();

const store = configureStore();

ReactDOM.render(

  <Router history = {history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
