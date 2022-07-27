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
            <h2>Posts</h2>
            <div>
                {posts.map(post => {
                    return(
                    <div key={post.id}>
                        <img src={process.env.REACT_APP_S3_URL + post.file} />
                        <p>{post.text}</p>
                    </div>
                )})}
            </div>
        </>
    )
};

export default ListPosts;



// <table>
//     <thead>
//         <tr>
//             <th>Text</th>
//             <th>Edit</th>
//             <th>Delete</th>
//         </tr>
//     </thead>
//     <tbody>
//         {posts.map(post => {
//             return (
//                 edit === post.id ?
//                     <tr key={post.id}>
//                         <td><input type="text" value={updateText} onChange={(e) => setUpdateText(e.target.value)}></input></td>
//                         <td><button onClick={(e) => updatePost(e, post.id)}>Save</button></td>
//                         <td><button onClick={() => deletePost(post.id)}>Delete</button></td>
//                     </tr> :
//                     <tr key={post.id}>
//                         <td>{post.text}</td>
//                         <td><button onClick={() => editPost(post.id, post.text)}>Edit</button></td>
//                         <td><button onClick={() => deletePost(post.id)}>Delete</button></td>
//                     </tr>)
//         })}
//     </tbody>
// </table>