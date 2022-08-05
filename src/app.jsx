import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './app.module.css';
import Login from './components/login/login';
import Maker from './components/maker/maker';

function App({ FileInput, authService, cardRepository }) {
  const timeStamp = new Date().getSeconds();
  return (
    <div className={styles.app}>
      <h1>{timeStamp}</h1>
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
    </div>
  );
}

export default App;
