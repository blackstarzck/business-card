import React, { memo } from 'react'
import Button from '../button/button';
// import ImageFileInput from '../image_file_input/image_file_input'; // Fileinput 컴포넌트로 대체 되었다.
import styles from "./card_edit_form.module.css"


const CardEditForm = memo(({ FileInput, card, updateCard, deleteCard }) => {
    const { id, name, company, title, email, message, theme, fileName, fileURL } = card;

    const onFileChange = file => {
        updateCard({
            ...card,
            fileName: file.name,
            fileURL: file.url
        });
    }
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
                <FileInput onFileChange={onFileChange} name={fileName}/>
            </div>
            <Button name="Delete" onClick={onSubmit}/>
        </form>
    );
});

export default CardEditForm