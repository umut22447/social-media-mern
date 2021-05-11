import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import blankpp from '../../images/blankpp.png';
import { followUser } from '../../api/authAPI';
import './style.css';

export default function ProfileHeader(props) {
    const { _id, username, userPicture, followers, follows, firstName, lastName } = props.userProfile;
    const { user, userToken } = useAuth();
    const [followActive, setFollowActive] = useState(!followers.includes(user._id));

    const handleFollow = () => {
        followUser(userToken, _id);
        setFollowActive(!followActive);
    }

    return (
        <div className="profile-header">
            <img className="profile-image" src={userPicture ? ("data:" + userPicture.mimetype + ";base64," + userPicture.buffer) : blankpp} alt={username + " avatar"} />
            <div className="profile-info">
                <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                    <strong className="username-text me-3">{username}</strong>
                    {user && user._id !== _id ? <button className="btn btn-outline-info align-self-center" onClick={handleFollow}>{followActive ? "Follow" : "Following"}</button> : null}
                </div>
                <p className="fullname-text">{firstName + " " + lastName}</p>
                <div style={{ display: 'flex' }}>
                    <div style={{ marginRight: 10 }} className="follow-text"><strong>{followers.length}</strong> Followers</div>
                    <div className="follow-text"><strong>{follows.length}</strong> Follows</div>
                </div>

            </div>
        </div>
    )
}
