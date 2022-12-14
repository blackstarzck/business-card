import React from 'react'
import styles from "./editor.module.css";
import CardEditForm from "../card_edit_form/card_edit_form";
import CardAddForm from "../card_add_form/card_add_form";


const Editor = ({ FileInput, cards, addCard, updateCard, deleteCard }) => {
    return (
        <section className={styles.editor}>
            <h1 className={styles.title}>Card Maker</h1>
            {Object.keys(cards).map(key => {
                return(
                    <CardEditForm 
                        key={key} 
                        card={cards[key]} 
                        FileInput={FileInput}
                        updateCard={updateCard} 
                        deleteCard={deleteCard}
                    />
                );
            })}
            <CardAddForm FileInput={FileInput} onAdd={addCard}/>
        </section>
    )
}

export default Editor