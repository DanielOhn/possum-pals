import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../Banner';

import InputComment from '../Comments/InputComment';
import ListComments from '../Comments/ListComments';
import Image from "../Images/Image";

const SinglePost = () => {
    const [post, setPost] = useState("");
    const thread = useParams();

    const getPost = async () => {
        try {
            const res = await fetch(`/posts/${thread.id}`);
            const data = await res.json();
            setPost(data);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getPost();
    }, []);

    return (
        <>
            <Banner />
            <InputComment />
            <div className="posts">
                {post ?
                    <div className="post" key={post.id}>
                        <Image alt={post.name} file={post.file} />
                        <div className="post-deets">
                            <div className="text-deets">
                                <p className="text-content">{post.text}</p>
                                <p className="text-id">#OP</p>
                            </div>
                            <small>{post.created}</small>
                        </div>
                    </div> :
                    <p>This thread doesn't exist!</p>
                }
            </div>
            <ListComments />
            <div className='footer'></div>
        </>
    )
}

export default SinglePost;