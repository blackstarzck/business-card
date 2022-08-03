import React, { useEffect } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './login.module.css';
import { useNavigate } from "react-router-dom";

const Login = ({ authService }) => {
  const navigate  = useNavigate();
  const goToMaker = (userId) => {
    navigate("/maker", {
      state: { id: userId }
    });
  }
  const onLogin = event => {
    authService //
      .login(event.currentTarget.textContent)
      .then(data => {
        console.log(`%c로그인 | UID: ${data.user.uid} | time: ${new Date}`, "color: gold");
        console.log(data);
        goToMaker(data.user.uid);
      });
  };

  // 로그인 정보가 있을 경우 자동 로그인을 실행한다.
  useEffect(() => {
    authService
    .onAuthChange(user => {
      // onAuthStateChanged의 return값으로 user정보를 받아온다. 

      user && goToMaker(user.id); // id = uid
    });
  });

  return (
    <section className={styles.login}>
      <Header />
      <section>
        <h1>Login</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Google
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Github
            </button>
          </li>
        </ul>
      </section>
      <Footer />
    </section>
  );
};

export default Login;
