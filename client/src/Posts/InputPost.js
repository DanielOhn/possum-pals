import React, { Fragment, useState } from 'react';

const InputPost = () => {

    const [text, setText] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();

        try {
            const body = { text }
            console.log(body)

            fetch('/posts', {
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
        <Fragment>
            <h1>Input Post</h1>
            <form onSubmit={onSubmitForm}>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
                
                <button>Add</button>
            </form>
        </Fragment>
    )
};

export default InputPost;