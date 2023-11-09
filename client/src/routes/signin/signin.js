import { useEffect } from 'react';
import styles from './signin.css';


function Signin() {
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');


    const onChangeId = (e) => {
        setInputId(e.target.value);
    }

    const onChangePw = (e) => {
        setInputPw(e.target.value);
    }

    const onClickSignin = () => {
        //console.log(inputId, inputPw);
        console.log('signin');
    }

    useEffect = (() => {
        
    }, []);

    return (
        <div>
            <div>
                <label htmlFor = "input_id">ID : </label>
                <input type = "text" name = "input_id" value={inputId} onChange = {onChangeId} />
            </div>
            <div>
                <label htmlFor = "input_pw">PW : </label>
                <input type = "password" name = "input_pw" value={inputPw} onChange = {onChangePw} />
            </div>
            <div>
                <button type='button' onClick={onClickSignin}>Signin</button>
            </div>
        </div>
    )
}



export default Signin;