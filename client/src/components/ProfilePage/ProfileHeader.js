import React from 'react';
import blankpp from '../../images/blankpp.png';
import './style.css';

export default function ProfileHeader(props) {
    const { username, userPicture, followers, follows, firstName, lastName } = props.userProfile;
    return (
        <div className="profile-header">
            <img className="profile-image" src={userPicture ? ("data:" + userPicture.mimetype + ";base64," + userPicture.buffer) : blankpp} alt={username + " avatar"} />
            <div className="profile-info">
                <strong style={{ fontSize: 30 }}>{username}</strong>
                <p style={{ color: '#a0a0a0' }}>{firstName + " " + lastName}</p>
                <div><strong>{followers.length}</strong> Followers</div>
                <div><strong>{follows.length}</strong> Follows</div>
            </div>
        </div>
    )
}
