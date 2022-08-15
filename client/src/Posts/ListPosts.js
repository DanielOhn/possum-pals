import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import Image from "../Images/Image";

const ListPosts = ({pid}) => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    const GetPosts = async (e) => {
        const pid = posts[posts.length - 1].id;
        let data = [];

        try {
            const res = await fetch(`/more-posts?pid=${pid}`);
            data = await res.json();

            const newPosts = [...posts, ...data]

            setPosts(newPosts);
        } catch (err) {
            console.error(err);
        }
    }
    
    const GetComment = ({pid}) => {
        const comment = comments.filter(comment => comment.parent === pid)[0];

        if (comment) {
            return (
                <div className={"comment"}>
                    {comment.file !== "" ? <Image alt={comment.name} file={comment.file} /> : <div></div>}
                    <div className="comment-deets">
                        <div className="text-deets">
                            <p className="text-content">{comment.text}</p>
                            <p className="text-id">#{comment.id}</p>
                        </div>
                        <small>{comment.created}</small>
                    </div>
                </div >
            );
        }
    }

    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await fetch("/posts");
                const data = await res.json();

                setPosts(data.posts);
                setComments(data.comments);

                setLoading(false);
            } catch (err) {
                console.error(err.message);
            }
        }
        getPosts();
    }, [])

    return (
        <>
            <div className="posts" rol="tablist">
                {loading ? <p>Loading threads...</p> :
                    posts.map((post) => {
                        return (
                            <div key={post.id}>
                                <div className="post" id={post.id}>
                                    <Image alt={post.name} file={post.file} />
                                    <div className="post-deets">
                                        <div className="text-deets">
                                            <p className="text-content">{post.text}</p>
                                            <p className="text-id">#{post.id}</p>
                                        </div>
                                        <div className="small-deets">
                                            <small>{post.created}</small>
                                            <Link to={`/p/${post.id}`}><small>[View]</small></Link>
                                        </div>
                                    </div>
                                </div>
                                <GetComment pid={post.id} />
                            </div>
                        )
                    })}
            </div>
            <div className="btn-load">
                <button role="tab" tabindex="0" onClick={e => GetPosts(e)}>More Threads</button>
            </div>
        </>
    )
};


export default ListPosts;