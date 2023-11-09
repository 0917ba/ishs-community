import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './profile.css';
import { useEffect } from 'react';

function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();


    useEffect(() => {
    }, [match]);

    <Link to=""/>
    navigate=("/profile/${userId}")
    console.log({history,location,match })





}

export default Profile;
