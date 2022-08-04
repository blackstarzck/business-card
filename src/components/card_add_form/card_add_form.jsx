import React, { useRef, useState } from 'react'
import Button from '../button/button';
// import ImageFileInput from '../image_file_input/image_file_input'; // Fileinput 컴포넌트로 대체 되었다.
import styles from "./card_add_form.module.css"


const CardAddForm = ({ FileInput, onAdd }) => {
    const formRef = useRef();
    const nameRef = useRef();
    const companyRef = useRef();
    const themeRef = useRef();
    const titleRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();
    const [ file, setFile ] = useState({ fileName: null, fileURL: null });

    const onFileChange = file => {
        console.log("+++ CardAddForm +++");
        console.log(file);

        setFile({
            fileName: file.name,
            fileURL: file.url
        })
    }

    const onSubmit = (evt) => {
        evt.preventDefault();

        const card = {
            id: Date.now(), //uuid
            name: nameRef.current.value || "",
            company: companyRef.current.value || "",
            theme: themeRef.current.value, // light, dark, colorful 세개 중 무조건 하나가 들어가기 때문에
            title: titleRef.current.value || "",
            email: emailRef.current.value || "",
            message: messageRef.current.value || "",
            fileName: file.fileName || "", // state값
            fileURL: file.fileURL || "" // state값
        };

        formRef.current.reset(); // form reset
        setFile({ fileName: null, fileURL: null }); // 초기화
        onAdd(card);
    }

    return (
        <form ref={formRef} className={styles.form}>
            <input ref={nameRef} className={styles.input} type="text" name="name" placeholder="Name" />
            <input ref={companyRef} className={styles.input} type="text" name="company" placeholder="Company" />
            <select ref={themeRef} className={styles.select} name="theme" placeholder="Theme">
                <option placeholder="light">light</option>
                <option placeholder="dark">dark</option>
                <option placeholder="colorful">colorful</option>
            </select>
            <input ref={titleRef} className={styles.input} type="text" name="title" placeholder="Title" />
            <input ref={emailRef} className={styles.input} type="text" name="email" placeholder="Email" />
            <textarea ref={messageRef} className={styles.textarea} name="message" placeholder="Message"></textarea>
            <div className={styles.fileInput}>
                <FileInput onFileChange={onFileChange} name={file.fileName}/>
            </div>
            <Button name="Add" onClick={onSubmit}/>
        </form>
    );
};

export default CardAddForm