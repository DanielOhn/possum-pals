import { useEffect, useState } from "react";

const ListPosts = () => {
    const [posts, setPosts] = useState([]);
    const [edit, setEdit] = useState(null);
    const [updateText, setUpdateText] = useState("");

    const getPosts = async () => {
        try {
            const res = await fetch("/posts");
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            console.error(err.message);
        }
    }

    const editPost = async (id, text) => {
        setUpdateText(text);
        setEdit(id);
    }

    const updatePost = async (e, id) => {
        e.preventDefault();
        
        try {
            const body = { updateText }

            const res = await fetch(`/posts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": 'application/json'},
                body: JSON.stringify(body)
            })

            window.location = '/';
        } catch (err) {
            console.error(err.message);
        }
    }

    const deletePost = async (id) => {
        try {
            const deletePost = await fetch(`/posts/${id}`, {
                method: "DELETE"
            });

            console.log(deletePost);

            setPosts(posts.filter(post => post.post_id !== id));

        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getPosts();
    }, [])

    return (
        <>
            <h2>Posts</h2>
            <table>
                <thead>
                    <tr>
                        <th>Text</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => {
                        return (
                            edit === post.post_id ?
                                <tr key={post.post_id}>
                                    <td><input type="text" value={updateText} onChange={(e) => setUpdateText(e.target.value)}></input></td>
                                    <td><button onClick={(e) => updatePost(e, post.post_id)}>Save</button></td>
                                    <td><button onClick={() => deletePost(post.post_id)}>Delete</button></td>
                                </tr> :
                                <tr key={post.post_id}>
                                    <td>{post.text}</td>
                                    <td><button onClick={() => editPost(post.post_id, post.text)}>Edit</button></td>
                                    <td><button onClick={() => deletePost(post.post_id)}>Delete</button></td>
                                </tr>)
                    })}
                </tbody>
            </table>
        </>
    )
};

export default ListPosts;