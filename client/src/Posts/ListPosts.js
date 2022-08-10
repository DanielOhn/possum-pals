import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import Image from "../Images/Image";

const ListPosts = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    const GetComment = ({ pid }) => {
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
            <div className="posts">
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
        </>
    )
};


export default ListPosts;