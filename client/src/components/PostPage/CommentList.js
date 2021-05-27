import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { usePost } from '../../contexts/PostContext';
import Comment from './Comment';

export default function CommentList({ postID }) {
    const { register, handleSubmit } = useForm();
    const { user } = useAuth();
    const { commentList, addComment, getCommentsByPostID } = usePost();

    const saveNewComment = data => {
        if (user) {
            const { commentText } = data;
            addComment(postID, commentText);
        }
        else {
            alert("You must be logged in to comment.");
        }
    }

    useEffect(() => {
        getCommentsByPostID(postID);
    }, [postID])

    return (
        <div className="commentlist-container">
            <form onSubmit={handleSubmit(saveNewComment)}>
                <div className="d-flex flex-row">
                    <input type="text" className="form-control comment-input" placeholder="Enter your comment" {...register("commentText")} required={true} />
                    <button type="submit" className="btn btn-outline-secondary comment-send-button">Send</button>
                </div>
            </form>
            {commentList.map(comment => <Comment comment={comment} />)}
        </div>
    )
}
