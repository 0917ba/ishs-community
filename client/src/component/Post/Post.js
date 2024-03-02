import { useEffect, useState } from 'react';

const Post = (props) => {
  const [post, setPost] = useState();

    const getPost = async () => {
        const resp = await fetch(`/post?uid=${props.uid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let json = await resp.json()
        setPost(json.content);
    }

    useEffect(() => {
        getPost();
    }, [props]);

    // create comment tree structure from flat array of comments
    // each comment has uid, author, content, target, createdAt and target is uid of parent comment
    // if comment has no target, it is root comment
    const createCommentTree = (comments) => {
        let commentTree = [];
        let commentMap = {};
        comments.forEach(comment => {
            commentMap[comment.uid] = comment;
            commentMap[comment.uid].children = [];
        });
        comments.forEach(comment => {
            if (comment.target) {
                commentMap[comment.target].children.push(comment);
            } else {
                commentTree.push(comment);
            }
        });
        return commentTree;
    }

    //sort comments by createdAt
    const sortComments = (commentTree) => {
        commentTree.forEach(comment => {
            comment.children = sortComments(comment.children);
        });
        return commentTree.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    }

    return (
        <div>
        <h1>Post Page</h1>
        {/* show post title, author, content */}
        {post && <div>
            <h2>{post.title}</h2>
            <p>{post.author}</p>
            <p>{post.content}</p>
        </div>}
        {/* show comments */}
        {post && post.comments && <div>
            <h2>Comments</h2>
            <hr style={{border: '1px solid black'}}></hr>
            {sortComments(createCommentTree(post.comments)).map(comment => {
                return (
                    <div key={comment.uid} style={{marginLeft: '20px'}}>
                        <p>{comment.author}</p>
                        {/* add formated createdAt with YYYY-MM-DD HH:MM:SS */}
                        <p>{new Date(comment.createdAt).toLocaleString()}</p>
                        <p>{comment.content}</p>
                        {comment.children.map(child => {
                            return (
                                <div key={child.uid} style={{marginLeft: '20px'}}>
                                    <hr style={{border: '1px solid grey'}}></hr>
                                    <p>{child.author}</p>
                                    <p>{child.createdAt}</p>
                                    <p>{child.content}</p>
                                </div>
                            );
                        })}
                        <hr style={{border: '1px solid black'}}></hr>
                    </div>
                    
                );
            })}
        </div>}
        </div>
    );
};

export default Post;
