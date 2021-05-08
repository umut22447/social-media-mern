import React from 'react';
import blankpp from '../../images/blankpp.png';
import './style.css';

export default function ProfileHeader(props) {
    const { username, userPicture, followers, follows, firstName, lastName } = props.userProfile;
    return (
        <div className="profile-header">
            <img className="profile-image" src={userPicture ? ("data:" + userPicture.mimetype + ";base64," + userPicture.buffer) : blankpp} alt={username + " avatar"} />
            <div className="profile-info">
                <strong className="username-text">{username}</strong>
                <p className="fullname-text">{firstName + " " + lastName}</p>
                <div style={{ display: 'flex' }}>
                    <div style={{ marginRight: 10 }} className="follow-text"><strong>{followers.length}</strong> Followers</div>
                    <div className="follow-text"><strong>{follows.length}</strong> Follows</div>
                </div>

            </div>
        </div>
    )
}
