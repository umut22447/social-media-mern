import React, { useEffect, useState } from 'react';
import { getPostsByUserID } from '../../api/postAPI';
import ProfilePost from './ProfilePost';
import './style.css';

export default function ProfilePostList(props) {
    const { userProfile } = props;
    const [userPostList, setUserPostList] = useState([]);

    useEffect(() => {
        if (userProfile) {
            getPostsByUserID(userProfile._id).then(list => {
                setUserPostList(Object.values(list));
            });
        }
    }, [userProfile])

    return (
        <div className="profile-post-list-container">
            {userPostList.map(post => <ProfilePost post={post} />)}
        </div>
    )
}
