import React, {
    createContext, useState, useContext
} from 'react';
import { getPostList, newPost, updatePostLikedUsers } from '../api/postAPI';
import { useAuth } from './AuthContext';


const PostContext = createContext({});

export const PostProvider = ({ children }) => {
    const { userToken } = useAuth();
    const [postList, setPostList] = useState([]);

    const getPosts = async () => {
        await getPostList(userToken).then(setPostList);
    }

    const addNewPost = async (image, description) => {
        await newPost(userToken, image, description);
    }

    const likePost = async (postID) => {
        await updatePostLikedUsers(postID, userToken);
    }

    return (
        <PostContext.Provider value={{ postList, addNewPost, getPosts, likePost }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePost = () => useContext(PostContext);

export default PostContext;