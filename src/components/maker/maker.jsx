import React, { useEffect, useState } from 'react'
import styles from "./maker.module.css"
import Footer from '../footer/footer';
import Header from '../header/header';
import { useNavigate } from "react-router-dom";
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ authService }) => {
    const [ cards, setCards ] = useState({
        "1": {
            id: "1", 
            name: "chanki",
            company: "GOSOK",
            theme: "dark", 
            title: "Software Engineer", 
            email: "bucheongosok@gmail.com",
            message: "1번 메시지",
            fileName: "FILE",
            fileURL: null
        },
        "2": {
            id: "2", 
            name: "chanki", 
            company: "GOSOK",
            theme: "light", 
            title: "Software Engineer", 
            email: "bucheongosok@gmail.com",
            message: "2번 메시지",
            fileName: "FILE",
            fileURL: "png"
        },
        "3": {
            id: "3", 
            name: "chanki",
            company: "GOSOK",
            theme: "colorful", 
            title: "Software Engineer", 
            email: "bucheongosok@gmail.com",
            message: "3번 메시지",
            fileName: "FILE",
            fileURL: null
        }
    });

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

    const createOrUpdateCard = card => {
        console.log(card);

        // #1:
        // const updated = {...cards};
        // updated[card.id] = card;
        // setCards(updated);

        // #2:
        setCards(cards => {
            const updated = {...cards};
            updated[card.id] = card;
            return updated
        });
    }
    const deleteCard = card => {
        console.log(card);

        setCards(cards => {
            const updated = {...cards};
            delete updated[card.id];
            return updated
        });
    }

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor 
                    cards={cards} 
                    addCard={createOrUpdateCard} 
                    updateCard={createOrUpdateCard} 
                    deleteCard={deleteCard}
                />
                <Preview
                    cards={cards}
                />
            </div>
            <Footer/>
        </section>
    )
}

export default Maker