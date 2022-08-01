import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const ListPosts = () => {
    const [posts, setPosts] = useState([]);
    // const [edit, setEdit] = useState(null);
    // const [updateText, setUpdateText] = useState("");

    // const editPost = async (id, text) => {
    //     setUpdateText(text);
    //     setEdit(id);
    // }

    // const updatePost = async (e, id) => {
    //     e.preventDefault();

    //     try {
    //         const body = { updateText }

    //         const res = await fetch(`/posts/${id}`, {
    //             method: "PUT",
    //             headers: { "Content-Type": 'application/json' },
    //             body: JSON.stringify(body)
    //         })

    //         window.location = '/';
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // }

    // const deletePost = async (id) => {
    //     try {
    //         const deletePost = await fetch(`/posts/${id}`, {
    //             method: "DELETE"
    //         });

    //         setPosts(posts.filter(post => post.id !== id));

    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // }

    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await fetch("/posts");
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                console.error(err.message);
            }
        }
        getPosts();
    }, [])

    return (
        <>
            <div className="posts">
                {posts.map(post => {
                    return (
                        <div className="post" key={post.id} id={post.id}>
                            <img alt={post.name} src={post.file} />
                            <div className="post-deets">
                                <div className="text-deets">
                                    <p>{post.text}</p>
                                    <p className="text-id">#{post.id}</p>
                                </div>
                                <div className="small-deets">
                                    <small>{post.created}</small>
                                    <Link to={`/p/${post.id}`}><small>[View Thread]</small></Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
};


export default ListPosts;