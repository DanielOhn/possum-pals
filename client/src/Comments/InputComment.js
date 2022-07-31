import { uploadFile } from "react-s3";
import { useEffect, useState } from "react"
import config from "../S3-Stuff/S3Config";
import { useParams } from 'react-router-dom';

window.Buffer = window.Buffer || require("buffer").Buffer;

const InputComment = () => {
    const [text, setText] = useState("");
    const [file, setFile] = useState("");
    const [disabled, setDisabled] = useState(true);

    const params = useParams();

    const handleFile = async (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            uploadFile(file, config).then(data => console.log(data)).catch(err => console.error(err));
            const body = { text: text, file: file.name, parent: params.id }

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