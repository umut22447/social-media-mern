import React, { useEffect, useState } from 'react';
import { getUsernameAndPictureByID } from '../../api/authAPI';
import { useAuth } from '../../contexts/AuthContext';
import { usePost } from '../../contexts/PostContext';
import blankpp from '../../images/blankpp.png';
import './style.css';

export default function Post({ post }) {
    const { userID, image, description, likedUsers } = post;
    const { user } = useAuth();
    const { likePost } = usePost();
    const [username, setUsername] = useState('');
    const [userPicture, setUserPicture] = useState(null);
    const [isPostLiked, setIsPostLiked] = useState(likedUsers.includes(user._id));

    const removeUserFromLikeList = () => {
        var index = likedUsers.indexOf(user._id);
        if (index !== -1) {
            likedUsers.splice(index, 1);
        }
    }

    const handleLikePost = () => {
        setIsPostLiked(!isPostLiked);
        if (isPostLiked) {
            removeUserFromLikeList();
        }
        else {
            likedUsers.push(user._id);
        }
        likePost(post._id);
    }

    useEffect(() => {
        getUsernameAndPictureByID(userID).then(result => {
            setUsername(result.username);
            setUserPicture(result.userPicture);
        });
    }, [])

    return (
        <div className="post-container shadow mt-3">
            <div className="post-header" style={{ justifyContent: 'space-between' }}>
                <div>
                    <img className="profile-picture-small" alt="profile" src={userPicture ? ("data:" + userPicture.mimetype + ";base64," + userPicture.buffer) : blankpp} />
                    <strong><a href={"/" + username} style={{ textDecoration: 'none', color: 'black' }}>{username}</a></strong>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                </svg>
            </div>
            <img className="post-image" alt="post" src={"data:" + image.mimetype + ";base64," + image.buffer} />
            <div className="post-section">
                <button className="post-button" onClick={handleLikePost}>
                    {isPostLiked ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" style={{ paddingTop: 2 }} fillRule="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" style={{ paddingTop: 2 }} fillRule="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg>}
                </button>
                <button className="post-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fillRule="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                    </svg>
                </button>
                <button className="post-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fillRule="currentColor" className="bi bi-cursor" viewBox="0 0 16 16">
                        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z" />
                    </svg>
                </button>
            </div>
            <div className="post-section">
                <strong>{likedUsers.length} like</strong>
            </div>
            <div className="post-section">
                <p><strong>{username}</strong> {description}</p>
            </div>
        </div>
    )
}
