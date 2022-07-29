import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ListComments = () => {

    const [comments, setComments] = useState([]);
    const params = useParams();

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

    useEffect(() => {
        getComments();
    }, []);

    return (
        <>
            {comments.map(comment => {
                return (
                    <div className="comment" key={comment.id}>
                        {comment.file !== null ? <img alt={comment.name} src={process.env.REACT_APP_S3_URL + comment.file} /> : <div></div>}
                        <div className="comment-deets">
                            <p>{comment.text}</p>
                            <small>{comment.created}</small>
                        </div>
                    </div>
                )
            })}
        </>
    )

}

export default ListComments;