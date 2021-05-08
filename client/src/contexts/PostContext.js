import React, {
    createContext, useState, useContext
} from 'react';
import { getPostList, newPost, updatePostLikedUsers } from '../api/postAPI';
import { useAuth } from './AuthContext';


const PostContext = createContext({});

export const PostProvider = ({ children }) => {
    const { userToken } = useAuth();
    const [postList, setPostList] = useState([]);
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

    const addNewPost = async (image, description) => {
        await newPost(userToken, image, description);
    }

    const likePost = async (postID) => {
        await updatePostLikedUsers(postID, userToken);
    }

    return (
        <PostContext.Provider value={{ postList, postLoading, addNewPost, getPosts, likePost }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePost = () => useContext(PostContext);

export default PostContext;