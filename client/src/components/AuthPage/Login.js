import React from 'react';
import logo from '../../images/logo.png'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';

export default function Login({ setIsLoginPageActive }) {
    const { login } = useAuth();
    const { register, handleSubmit } = useForm();

    const handleLogin = (data) => {
        const { email, password } = data;
        login(email, password);
    }

    return (
        <div className="form-container shadow">
            <img className="logo" alt="logo" src={logo} />
            <form onSubmit={handleSubmit(handleLogin)} className="w-75">
                <div className="form-group">
                    <label style={{ fontWeight: 'bold' }}>Email</label>
                    <input name="email" type="text" className="form-control" {...register("email")} required={true} />
                </div>
                <div className="form-group">
                    <label style={{ fontWeight: 'bold' }}>Password</label>
                    <input name="password" type="password" className="form-control" {...register("password")} required={true} />
                </div>
                <div className="button-group">
                    <button className="btn btn-outline-success mt-3" type='submit'>Sign In</button>
                </div>
            </form>
            or
            <button className="btn btn-outline-info" onClick={() => { setIsLoginPageActive(false) }}>Create Account</button>
        </div>
    )
}
