import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styles from './app.module.css';
import Login from './components/login/login';
import Maker from './components/maker/maker';

function App({ FileInput, authService, cardRepository }) {
  const historyState = useNavigate();
  // console.log(historyState.state)

  return (
    <div className={styles.app}>
      <Routes>
        <Route 
          path="/*"
          element={ <Login authService={authService} /> }
        />
        <Route
          path={`${process.env.PUBLIC_URL}/maker`}
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
