import React from 'react'
import Button from '../button/button';
import ImageFileInput from '../image_file_input/image_file_input';
import styles from "./card_edit_form.module.css"



const CardEditForm = ({ card, updateCard, deleteCard }) => {
    const { id, name, company, title, email, message, theme, fileName, fileURL } = card;

    const onChange = (event) => {
        if(event.currentTarget == null) return;
    
        console.log(event.currentTarget.name, event.currentTarget.value);
    
        event.preventDefault();
    
        updateCard({
            ...card,
            [event.currentTarget.name]: event.currentTarget.value,
        })
    }
    const onSubmit = (event) => {
        deleteCard(card);
    }

    return (
        <form className={styles.form}>
            <input className={styles.input} type="text" name="name" onChange={onChange} value={name} />
            <input className={styles.input} type="text" name="company" onChange={onChange} value={company} />
            <select className={styles.select} name="theme" onChange={onChange} value={theme}>
                <option value="light">light</option>
                <option value="dark">dark</option>
                <option value="colorful">colorful</option>
            </select>
            <input className={styles.input} type="text" name="title" onChange={onChange} value={title} />
            <input className={styles.input} type="text" name="email" onChange={onChange} value={email} />
            <textarea className={styles.textarea} name="message" onChange={onChange} value={message}></textarea>
            <div className={styles.fileInput}>
                <ImageFileInput/>
            </div>
            <Button name="Delete" onClick={onSubmit}/>
        </form>
    );
};

export default CardEditForm