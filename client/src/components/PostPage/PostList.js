import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { usePost } from '../../contexts/PostContext';
import Post from './Post';
import './style.css';


export default function PostList() {
    const { user, signOut } = useAuth();
    const { postList, addNewPost, getPosts } = usePost();
    const { register, handleSubmit } = useForm();

    const submitPost = data => {
        const { image, description } = data;
        addNewPost(image, description);
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
                    <input type="file" accept="image/png, image/jpeg" name="image" {...register("image")} required={true} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input name="description" type="text" className="form-control" {...register("description")} required={true} />
                </div>
                <button type="submit">submit</button>
            </form>
            {postList.map(post => <Post post={post} key={post._id} />)}
            <button onClick={signOut}>Sign Out</button>
        </div>
    )
}
