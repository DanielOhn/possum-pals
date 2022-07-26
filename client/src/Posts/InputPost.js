import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

window.Buffer = window.Buffer || require("buffer").Buffer;

const InputPost = () => {
    const [text, setText] = useState("");
    const [file, setFile] = useState();
    const [disabled, setDisabled] = useState(true);
    const [signed, setSigned] = useState(null);
    const [url, setUrl] = useState(null);

    const handleFile = async (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setDisabled(false);
        }
    }
    
    const onSubmitForm = async (e) => {
        e.preventDefault();
        setDisabled(true);

        if (url !== null && signed !== null) {
            try {
                const body = { text: text, file: url }
    
                await fetch(signed, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
    
                await fetch('/posts', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                })
    
                window.location = '/';
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    useEffect(() => {
        const getSignedRequest = async () => {
            if (file !== undefined) {
                const newName = nanoid();

                const res = await fetch(`/sign-s3?fileName=${newName}&fileType=${file.type}`);
                const data = await res.json();

                setSigned(data.signedRequest);
                setUrl(data.url);
            }
        }

        getSignedRequest();
    }, [file])

    return (
        <>
            <div className="header">
                <h1>Possum Pals</h1>
                <h4>You Can (Not) Shitpost</h4>
            </div>
            <form onSubmit={onSubmitForm} className="post-input">
                <textarea placeholder="Need an image to make a thread..." type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <input type="file" accept=".jpg, .jpeg, .png" onChange={(e) => handleFile(e)} />
                <button disabled={disabled}>Create Thread</button>
            </form>
        </>
    )
};

export default InputPost;