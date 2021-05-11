import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { usePost } from '../../contexts/PostContext';
import Post from './Post';
import './style.css';
import Header from '../Header/Header';


export default function PostList() {
    const { user } = useAuth();
    const { postList, getPosts, postLoading } = usePost();
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (user) {
            getPosts(page);
        }
    }, [user, page])

    return (
        <div>
            <Header />
            <div className="postlist-container">
                {postList.map(post => <Post post={post} key={post._id} />)}
                {postLoading ? <button className="btn btn-outline-success mt-3 mb-3" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="sr-only">Loading...</span>
                </button> :
                    <button className="btn btn-outline-success mt-3 mb-3" onClick={() => setPage(page + 1)}>Load More Posts</button>}
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