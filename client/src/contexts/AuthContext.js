import React, {
    createContext, useState, useEffect, useContext
} from 'react';
import { loginWithEmailAndPassword, registerWithEmailAndPassword, getSavedUser, saveUser, removeSavedUser } from '../api/authAPI';


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
            setUser(response.user);
            setUserToken(response.token);
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

    const remindUser = async () => {
        const { token, user } = await getSavedUser();
        if (user && token) {
            await setUser(user);
            await setUserToken(token);
        }
        return (token && user);
    }

    const signOut = async () => {
        await removeSavedUser();
        await setUser(null);
        await setUserToken(null);
    }

    useEffect(() => {
        setRemindProcess(true);
        remindUser().then(() => { setRemindProcess(false) });
    }, []);

    return (
        <AuthContext.Provider value={{ user, userToken, authLoading, remindProcess, login, registerUser, remindUser, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;