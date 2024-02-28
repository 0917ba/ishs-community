import Post from "../component/Post/Post";

const PostPage = () => {

    function signin() {
        fetch('http://app.ishs.co.kr/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({id: 'helloworld', password: 'ishs12345!'})
        }).then(res => {
            console.log(res.status)
        })
    }

    function check_session() {
        fetch('http://app.ishs.co.kr/check_session', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(res => {
            console.log(res.status)
        })
    }

    return (
        <div>
            <Post uid="ba4e61c7-d777-4a82-8f03-c53e77f65525"/>
            <button onClick={signin}>Signin</button>
            <button onClick={check_session}>check_session</button>
        </div>
    );
};

export default PostPage;