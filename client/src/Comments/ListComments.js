import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ListComments = () => {
    const [comments, setComments] = useState([]);
    const params = useParams();

    useEffect(() => {
        const getComments = async () => {
            try {
                const parent = params.id;
                const res = await fetch(`/comments/${parent}`);
                const data = await res.json();
    
                setComments(data);
            } catch (err) {
                console.error(err.message);
            }
        }

        getComments();
    }, [])

    return (
        <>
            {comments.map(comment => {
                return (
                    <div className="comment" key={comment.id} id={comment.id}>
                        {comment.file !== "" ? <img alt={comment.name} src={comment.file} /> : <div></div>}
                        <div className="comment-deets">
                            <div className="text-deets">
                                <p>{comment.text}</p>
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