import React, { useCallback, useEffect, useState } from 'react'
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

    const onLogout = useCallback(() => { 
        // Header 컴포넌트를 memo로 감싸주었으나 계속 리렌더 되는 현상이 있다.
        // 이는 Maker 컴포넌트가 렌더 되는 것과 동시에 onLogout 함수가 호출이 되기 때문이다.
        // 이 onLogout 함수는 Header 컴포넌트에 prop으로 넘겨주기 때문에...
        // 이를 방지하고자 useCallback함수를 사용해 리렌더를 방지한다.
        // 하지만 무조건 1회성으로 사용되면 아된다. 
        // 사용자가 로그아웃을 실제로 실행할때 authService의 상태가 변경되고, onLogout 함수는 재사용되어야만 한다.

        console.log(`%c로그아웃 | time: ${new Date}`, "color: darkorange");
        authService.logout();
    }, [authService]);

    useEffect(() => {
        if(!userId) return;

        const stopSync = cardRepository.syncCard(userId, cards => {
            setCards(cards);
        });

        // 컴포넌트가 언마운트 되었을때
        // 불필요한 네트워크 사용을 최소화 하기 위함
        return () => stopSync();

    }, [userId, cardRepository]);

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
    }, [authService, userId, navigate]);

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