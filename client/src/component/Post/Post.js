import { useEffect, useState } from "react";

const Post = (props) => {

    const [post, setPost] = useState();

    const getPost = async () => {
        const resp = await fetch(`http://app.ishs.co.kr/post/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: props.uid
            })
        })
        let json = await resp.json()
        setPost(json.content);
    }

    useEffect(() => {
        getPost();
    }, [props]);

    return (
        <div>
        <h1>Post Page</h1>
        <div>
            {post}
        </div>
        </div>
    );
};

export default Post;