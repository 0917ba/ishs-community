import report from '../../component/img/report.svg';

export default function Comment(props) {
    const comments = props.comments;
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
        sortComments(createCommentTree(comments)).map((comment, index) => {
            return (
                <div key={index} className="comment">
                    <div className='comment_box'>
                        <p className='comment_author'>{comment.author}</p>
                        <p className='comment_content'>{comment.content}</p>
                        <img src={report} alt='report' className='report'/>
                        <p className='comment_time'>{comment.createdAt}</p>
                    </div>
                    {comment.children.map((child, index) => {
                        return (
                            <div key={index} className='comment_box'>
                                <p className='comment_author'>{child.author}</p>
                                <p className='comment_content'>{child.content}</p>
                                <img src={report} alt='report' className='report'/>
                                <p className='comment_time'>{child.createdAt}</p>
                            </div>
                        );
                    })
                    }
                    <hr className='line_comment'></hr>
                </div>
            );
        })
    );
}
