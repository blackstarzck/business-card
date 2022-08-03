import React, { useEffect } from 'react'
import styles from "./maker.module.css"
import Footer from '../footer/footer';
import Header from '../header/header';
import { useNavigate } from "react-router-dom";
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ authService }) => {
    const navigate  = useNavigate();

    const onLogout = () => {
        console.log(`%c로그아웃 | time: ${new Date}`, "color: darkorange");
        authService.logout();
    }

    useEffect(() => {
        authService
        .onAuthChange(user => {
            if(!user) navigate("/");
        });
    });

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor/>
                <Preview/>
            </div>
            <Footer/>
        </section>
    )
}

export default Maker