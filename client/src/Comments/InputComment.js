import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';

window.Buffer = window.Buffer || require("buffer").Buffer;

const InputComment = () => {
    const [text, setText] = useState("");
    const [file, setFile] = useState("");
    const [disabled, setDisabled] = useState(true);

    const [signed, setSigned] = useState(null);
    const [url, setUrl] = useState("");

    const params = useParams();

    const handleFile = async (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            getSignedRequest();
        }
    }

    const getSignedRequest = async () => {
        if (file !== "") {
            const res = await fetch(`/sign-s3?fileName=${file.name}&fileType=${file.type}`);
            const data = await res.json();

            setSigned(data.signedRequest);
            setUrl(data.url);
        }
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            if (file !== "") {
                await fetch(signed, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
            }

            const body = { text: text, file: url, parent: params.id }

            const r = await fetch('/comments', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            window.location = `/p/${params.id}`;
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        if (text !== "" || file !== "") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [text, file])

    return (
        <>
            <div className="header">
                <h1>Possum Pals</h1>
                <h4>You Can (Not) Shitpost</h4>
            </div>
            <form onSubmit={onSubmitForm} className="post-input">
                <textarea placeholder="Add some text..." type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <input type="file" accept=".jpg, .jpeg, .png" onChange={(e) => handleFile(e)} />
                <button disabled={disabled}>Add Comment</button>
            </form>
        </>
    )
}

export default InputComment;