import React, {
    createContext, useState, useEffect, useContext
} from 'react';
import { loginWithEmailAndPassword, registerWithEmailAndPassword, getSavedUser, saveUser, removeSavedUser, updateProfilePicture, getUserDetails } from '../api/authAPI';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);
    const [remindProcess, setRemindProcess] = useState(true);

    const login = async (email, password) => {
        setAuthLoading(true);
        const response = await loginWithEmailAndPassword(email, password);
        if (response.user) {
            setUserToken(response.token);
            setUser(response.user);
            await saveUser(response.token, response.user);
        }
        setAuthLoading(false);
        return response;
    }

    const registerUser = async (firstName, lastName, username, email, password) => {
        setAuthLoading(true);
        const response = await registerWithEmailAndPassword(firstName, lastName, username, email, password);
        setAuthLoading(false);
        return response;
    }

    const updateUserDetails = async () => {
        await getUserDetails(userToken).then(setUser);
    }

    const changeProfilePicture = async (image) => {
        updateProfilePicture(userToken, image).then(() => {
            updateUserDetails();
        });
    }

    const remindUser = async () => {
        const { token } = await getSavedUser();
        if (token) {
            await setUserToken(token);
            await getUserDetails(token).then(setUser);
        }
        return (token ? true : false);
    }

    const signOut = async () => {
        await removeSavedUser();
        await setUserToken(null);
        await setUser(null);
    }

    useEffect(() => {
        setRemindProcess(true);
        remindUser().then(() => { setRemindProcess(false) });
    }, []);

    return (
        <AuthContext.Provider value={{
            user, userToken, authLoading, remindProcess,
            login, registerUser, updateUserDetails, remindUser,
            signOut, changeProfilePicture
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;