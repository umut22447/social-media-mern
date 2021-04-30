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
        getPostList(userToken).then(setPostList);
    }

    const addNewPost = async (image, description) => {
        newPost(userToken, image, description).then(() => { getPosts() });
    }

    const likePost = async (postID) => {
        updatePostLikedUsers(postID, userToken);
    }

    return (
        <PostContext.Provider value={{ postList, addNewPost, getPosts, likePost }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePost = () => useContext(PostContext);

export default PostContext;