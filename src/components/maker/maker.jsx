import React, { useEffect, useState } from 'react'
import styles from "./maker.module.css"
import Footer from '../footer/footer';
import Header from '../header/header';
import { useNavigate } from "react-router-dom";
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ FileInput, authService, cardRepository }) => {
    const historyState = useNavigate().state;
    const [ userId, setUserId ] = useState( historyState && historyState.id );
    const [ cards, setCards ] = useState({});

    const navigate  = useNavigate();

    const onLogout = () => {
        console.log(`%c로그아웃 | time: ${new Date}`, "color: darkorange");
        authService.logout();
    }
    useEffect(() => {
        if(!userId) return;
        
        const stopSync = cardRepository.syncCard(userId, cards => {
            setCards(cards);
        });

        // 컴포넌트가 언마운트 되었을때
        // 불필요한 네트워크 사용을 최소화 하기 위함
        return () => stopSync();

    }, [userId]);

    useEffect(() => {
        authService
        .onAuthChange(user => {
            if(user){
                setUserId(user.uid);
                console.log(`firebase user ID: ${userId}`);
            }else{
                navigate("/"); // 로그인 화면으로  이동
            }
        });
    });

    const createOrUpdateCard = card => {
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

        // 파이어베이스 실시간 데이터베이스 write
        cardRepository.saveCard(userId, card);
    }
    const deleteCard = card => {
        console.log(card);

        setCards(cards => {
            const updated = {...cards};
            delete updated[card.id];
            return updated
        });

        // 파이어베이스 실시간 데이터베이스 delete
        cardRepository.removeCard(userId, card);
    }

    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor 
                    FileInput={FileInput}
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