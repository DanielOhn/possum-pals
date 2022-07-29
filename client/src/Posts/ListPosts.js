import { useEffect, useState } from "react";
import SinglePost from "./SinglePost";

import { useParams } from 'react-router-dom';

const ListPosts = () => {
    const [posts, setPosts] = useState([]);
    const [edit, setEdit] = useState(null);
    const [updateText, setUpdateText] = useState("");

    const params = useParams();

    const getPosts = async () => {
        try {
            const res = await fetch("/posts");
            const data = await res.json();
            setPosts(data);
            console.log(data);
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
                headers: { "Content-Type": 'application/json' },
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

            setPosts(posts.filter(post => post.id !== id));

        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <>
            <div className="posts">
                {posts.map(post => {
                    return(
                    <div className="post" key={post.id}>
                        <img alt={post.name} src={process.env.REACT_APP_S3_URL + post.file} />
                        <div className="post-deets">
                            <p>{post.text}</p>
                            <small>{post.created}</small>
                        </div>
                    </div>
                )})}
            </div>
        </>
    )
};


export default ListPosts;