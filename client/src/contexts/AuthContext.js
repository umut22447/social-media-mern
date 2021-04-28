import React, {
    createContext, useState, useEffect, useContext
} from 'react';
import { loginWithEmailAndPassword, registerWithEmailAndPassword } from '../api/authAPI';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);

    const login = async (email, password) => {
        setAuthLoading(true);
        const response = await loginWithEmailAndPassword(email, password);
        if (response.user) {
            setUser(response.user);
            setUserToken(response.token);
        }
        else {
            setUser(null);
            setUserToken(null);
        }
        setAuthLoading(false);
    }

    const registerUser = async (firstName, lastName, username, email, password) => {
        setAuthLoading(true);
        const response = await registerWithEmailAndPassword(firstName, lastName, username, email, password);
        console.log(response)
        setAuthLoading(false);
    }

    useEffect(() => {
    }, []);

    return (
        <AuthContext.Provider value={{ user, userToken, authLoading, login, registerUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;