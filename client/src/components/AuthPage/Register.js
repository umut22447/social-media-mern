import React from 'react';
import logo from '../../images/logo.png'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';

export default function Register({ setIsLoginPageActive }) {
    const { registerUser } = useAuth();
    const { register, handleSubmit } = useForm();

    const handleRegister = (data) => {
        const { firstName, lastName, username, email, password } = data;
        registerUser(firstName, lastName, username, email, password);
    }

    return (
        <div className="form-container shadow">
            <img className="logo" alt="logo" src={logo} />
            <form onSubmit={handleSubmit(handleRegister)} className="w-75">
                <div className="form-group">
                    <label style={{ fontWeight: 'bold' }}>First Name</label>
                    <input name="email" type="text" className="form-control" {...register("firstName")} required={true} />
                </div>
                <div className="form-group">
                    <label style={{ fontWeight: 'bold' }}>Last Name</label>
                    <input name="password" type="text" className="form-control" {...register("lastName")} required={true} />
                </div>
                <div className="form-group">
                    <label style={{ fontWeight: 'bold' }}>Username</label>
                    <input name="email" type="text" className="form-control" {...register("username")} required={true} />
                </div>
                <div className="form-group">
                    <label style={{ fontWeight: 'bold' }}>Email</label>
                    <input name="email" type="text" className="form-control" {...register("email")} required={true} />
                </div>
                <div className="form-group">
                    <label style={{ fontWeight: 'bold' }}>Password</label>
                    <input name="password" type="password" className="form-control" {...register("password")} required={true} />
                </div>
                <div className="button-group">
                    <button className="btn btn-outline-success mt-3" type='submit'>Sign Up</button>
                </div>
            </form>
            or
            <button className="btn btn-outline-info" onClick={() => { setIsLoginPageActive(true) }}>Sign In</button>
        </div>
    )
}
