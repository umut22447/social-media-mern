import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { usePost } from '../../contexts/PostContext';
import Post from './Post';
import './style.css';


export default function PostList() {
    const { user, changeProfilePicture, signOut } = useAuth();
    const { postList, addNewPost, getPosts } = usePost();
    const { register, handleSubmit } = useForm();

    const submitPost = data => {
        const { image, description } = data;
        addNewPost(image, description);
    }

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
        <div className="postlist-container">
            <form onSubmit={handleSubmit(submitPost)}>
                <div className="form-group">
                    <label>Image</label>
                    <br />
                    <input type="file" accept="image/png, image/jpeg" name="image" {...register("image")} required={true} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input name="description" type="text" className="form-control" {...register("description")} required={true} />
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                    <button className="btn btn-outline-success" type="submit">Create a Post</button>
                </div>
            </form>
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
            {postList.map(post => <Post post={post} key={post._id} />)}
            <button className="btn btn-outline-danger mt-3" onClick={signOut}>Sign Out</button>
        </div>
    )
}
