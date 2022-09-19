import React from 'react';
import ReactDOM from 'react-dom/client';
import "jquery";
import "popper.js/dist/umd/popper";
import "bootstrap/dist/js/bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import App from './App';
import "./index.css";
import { Provider } from 'react-redux';
import store from '../src/Components/store';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </AlertProvider>
);



