import React, { useRef, useState } from 'react'
import styles from "./image_file_input.module.css"

const ImageFileInput = ({ imageUploader, name, onFileChange }) => {
    const [ loading, setLoading ] = useState(false);

    const inputRef = useRef();
    const onButtonClick = (evt) => {
        evt.preventDefault();
        inputRef.current.click(); // jQuery trigger처럼 작동하네?
    }

    const onChange = async evt => {
        setLoading(true);
        const uploaded = await imageUploader.upload(evt.target.files[0]);
        setLoading(false);

        onFileChange({
            name: uploaded.original_filename,
            url: uploaded.url
        });
    }

    return (
        <div className={styles.container}>
            <input
                ref={inputRef}
                className={styles.input} 
                type="file" 
                accept="image/*" 
                name="file"
                onChange={onChange}
            />
            { !loading && <button className={`${styles.button} ${name ? styles.pink : styles.grey}`} onClick={onButtonClick}>
                {name || "No File"}
            </button> }
            { loading && <div className={styles.loading}></div> }
        </div>
    );
}
export default ImageFileInput