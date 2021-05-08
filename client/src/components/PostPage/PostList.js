import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { usePost } from '../../contexts/PostContext';
import Post from './Post';
import './style.css';
import Header from '../Header/Header';


export default function PostList() {
    const { user, changeProfilePicture } = useAuth();
    const { postList, getPosts } = usePost();

    const submitProfilePicture = data => {
        const { profilePicture } = data;
        changeProfilePicture(profilePicture);
    }

    useEffect(() => {
        if (user) {
            getPosts();
        }
    }, [user])

    return (
        <div>
            <Header />
            <div className="postlist-container">
                {postList.map(post => <Post post={post} key={post._id} />)}
            </div>
        </div>
    )
}


/*

            <form onSubmit={handleSubmit(submitProfilePicture)}>
                <div className="form-group">
                    <label>Profile Picture</label>
                    <br />
                    <input type="file" accept="image/png, image/jpeg" name="profilePicture" {...register("profilePicture")} required={true} />
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                    <button className="btn btn-outline-success" type="submit">Change Profile Picture</button>
                </div>
            </form>
*/