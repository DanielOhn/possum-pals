import React, { useState } from 'react';
import { uploadFile } from 'react-s3';
import config from '../S3Config';

window.Buffer = window.Buffer || require("buffer").Buffer;

const InputPost = () => {

    const [text, setText] = useState("");
    const [file, setFile] = useState();
    const [disabled, setDisabled] = useState(true);

    const handleFile = async (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setDisabled(false);
        }
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            console.log(file);
            const res = uploadFile(file, config).then(data => console.log(data)).catch(err => console.error(err));
            const body = { text: text, file: file.name }

            console.log(JSON.stringify(body));


            const r = await fetch('/posts', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            window.location = '/';
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <div className="header">
                <h1>Possum Pals</h1>
                <h4>You Can (Not) Shitpost</h4>
            </div>
            <form onSubmit={onSubmitForm} className="post-input">
                <textarea placeholder="Add some text..." type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <input type="file" accept=".jpg, .jpeg, .png" onChange={(e) => handleFile(e)} />
                <button disabled={disabled}>Create Thread</button>
            </form>
        </>
    )
};

export default InputPost;