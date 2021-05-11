import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import './style.css';
import { getUserProfile } from '../../api/authAPI';
import ProfileHeader from './ProfileHeader';
import ProfilePostList from './ProfilePostList';

export default function Profile() {
    const { username } = useParams();
    const [userProfile, setUserProfile] = useState(null);
    const [userFindProcess, setUserFindProcess] = useState(false);

    useEffect(() => {
        if (username) {
            setUserFindProcess(true);
            getUserProfile(username).then(response => {
                if (response._id) {
                    setUserProfile(response);
                }
                setUserFindProcess(false);
            });
        }
    }, [username])

    return (
        <div>
            <Header />
            <div className="profile-container">
                {userProfile ? <ProfileHeader userProfile={userProfile} /> : userFindProcess ? null : <h1 className="display-5">We cannot find the page you are looking for :(</h1>}
                <div style={{ borderBottom: '1px solid #e0e0e0', width: '90%', marginTop: 20 }} />
                {userProfile ? <ProfilePostList userProfile={userProfile} /> : null}
            </div>
        </div>
    )
}
