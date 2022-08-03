import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import "./index.module.css";
import AuthService from './service/auth_service';

// Dependency Injection
const authService = new AuthService();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App authService={authService}/>
  </React.StrictMode>
);
