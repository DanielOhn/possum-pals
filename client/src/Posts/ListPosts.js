import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const ListPosts = () => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([])
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

    const GetComment = ({ pid }) => {
        const comment = comments.filter(comment => comment.parent === pid)[0];

        return (
            <div className="comment">
                {comment.file !== "" ? <img alt={comment.name} src={comment.file} /> : <div></div>}
                <div className="comment-deets">
                    <div className="text-deets">
                        <p>{comment.text}</p>
                        <p className="text-id">#{comment.id}</p>
                    </div>
                    <small>{comment.created}</small>
                </div>
            </div >
        );
    }

    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await fetch("/posts");
                const data = await res.json();

                console.log(data);
                setPosts(data.posts);
                setComments(data.comments);
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
                        <div key={post.id}>
                            <div className="post" id={post.id}>
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
                            <GetComment pid={post.id} />
                        </div>
                    )
                })}
            </div>
        </>
    )
};


export default ListPosts;