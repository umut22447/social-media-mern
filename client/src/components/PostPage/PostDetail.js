import React, { useEffect, useState } from 'react';
import { usePost } from '../../contexts/PostContext';
import { useParams } from 'react-router-dom';
import Post from './Post';
import Header from '../Header/Header';
import './style.css';
import CommentList from './CommentList';

export default function PostDetail() {
    const { postID } = useParams();
    const { getPostByID } = usePost();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPostByID(postID).then(post => {
            setPost(post._id ? post : null);
            setLoading(false);
        });
    }, [postID])

    return (
        <div>
            {console.log(post)}
            <Header />
            <div className="postlist-container">
                {loading ? null : post ? <Post post={post} key={post._id} isDetail={true} /> : <h1 className="display-5">We cannot find the page you are looking for :(</h1>}
                {post ? <CommentList postID={postID} /> : null}
            </div>
        </div>
    )
}
