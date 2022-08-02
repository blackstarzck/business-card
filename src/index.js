import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import "./index.module.css";
import AuthService from './service/auth_service';

const authService = new AuthService();

console.log(`REACT_APP_FIREBASE_API_KEY: ${process.env.REACT_APP_FIREBASE_API_KEY}`)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App authService={authService}/>
  </React.StrictMode>
);
