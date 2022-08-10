import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Image from "../Images/Image";

const ListComments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        const getComments = async () => {
            try {
                const parent = params.id;
                const res = await fetch(`/comments/${parent}`);
                const data = await res.json();

                setLoading(false);
                setComments(data);
            } catch (err) {
                console.error(err.message);
            }
        }

        getComments();
    }, [])

    return (
        <>
            {loading ?
                <p>Loading comments...</p>
                : comments.map(comment => {
                    return (
                        <div className="comment" key={comment.id} id={comment.id}>
                            {comment.file !== "" ? <Image alt={comment.name} file={comment.file} /> : <div></div>}
                            <div className="comment-deets">
                                <div className="text-deets">
                                    <p className="text-content">{comment.text}</p>
                                    <p className="text-id">#{comment.id}</p>
                                </div>
                                <small>{comment.created}</small>
                            </div>
                        </div>
                    )
                })}
        </>
    )

}

export default ListComments;