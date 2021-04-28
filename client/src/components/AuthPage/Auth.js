import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'
import './style.css'

export default function Auth() {
    const [isLoginPageActive, setIsLoginPageActive] = useState(true);

    return (
        <div className="auth-container">
            {isLoginPageActive ? <Login setIsLoginPageActive={setIsLoginPageActive} /> : <Register setIsLoginPageActive={setIsLoginPageActive} />}
        </div>
    )
}
