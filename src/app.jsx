import React from 'react';
import { HashRouter , BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './app.module.css';
import Login from './components/login/login';
import Maker from './components/maker/maker';

function App({ FileInput, authService, cardRepository }) {
  const timeStamp = new Date().getSeconds();
  return (
    <div className={styles.app}>
      <h1>{timeStamp}</h1>

      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route 
            path="/"
            element={ <Login authService={authService} /> }
          />
          <Route
            path="/maker"
            element={
              <Maker
                FileInput={FileInput}
                authService={authService}
                cardRepository={cardRepository}
              />
            }  
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
