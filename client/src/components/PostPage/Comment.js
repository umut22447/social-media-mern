import React, { useEffect, useState } from 'react';
import { getUsernameAndPictureByID } from '../../api/authAPI';
import blankpp from '../../images/blankpp.png';
import './style.css';

export default function Comment(props) {
    const { userID, commentText } = props.comment;
    const [username, setUsername] = useState('');
    const [userPicture, setUserPicture] = useState(null);

    useEffect(() => {
        getUsernameAndPictureByID(userID).then(result => {
            setUsername(result.username);
            setUserPicture(result.userPicture);
        });
    }, [userID])

    return (
        <div className="comment-container">
            <div>
                <img className="profile-picture-small" alt="profile" src={userPicture ? ("data:" + userPicture.mimetype + ";base64," + userPicture.buffer) : blankpp} />
                <strong><a href={"/" + username} style={{ textDecoration: 'none', color: 'black' }}>{username}</a></strong>
            </div>
            <p style={{ wordWrap: 'break-word' }}>{commentText}</p>
        </div>
    )
}
