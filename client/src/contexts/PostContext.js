import React, {
    createContext, useState, useContext
} from 'react';
import { addNewComment, getComments } from '../api/commentAPI';
import { getPostList, newPost, updatePostLikedUsers, getPostByPostID } from '../api/postAPI';
import { useAuth } from './AuthContext';


const PostContext = createContext({});

export const PostProvider = ({ children }) => {
    const { userToken } = useAuth();
    const [postList, setPostList] = useState([]);
    const [commentList, setCommentList] = useState([]);
    const [postLoading, setPostLoading] = useState(false);

    const getPosts = async (page) => {
        setPostLoading(true);
        await getPostList(userToken, page).then(list => {
            setPostList([...postList, ...list]);
        }).catch(err => {
            alert('Connection Error');
        });
        setPostLoading(false);
    }

    const getPostByID = async (postID) => {
        return await getPostByPostID(postID, userToken);
    }

    const addNewPost = async (image, description) => {
        await newPost(userToken, image, description);
    }

    const likePost = async (postID) => {
        await updatePostLikedUsers(postID, userToken);
    }

    const getCommentsByPostID = async (postID) => {
        await getComments(postID).then(setCommentList).catch(err => alert(err));
    }

    const addComment = async (postID, commentText) => {
        await addNewComment(postID, commentText, userToken);
    }

    return (
        <PostContext.Provider value={{ postList, postLoading, commentList, addNewPost, getPosts, likePost, getPostByID, getCommentsByPostID, addComment }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePost = () => useContext(PostContext);

export default PostContext;