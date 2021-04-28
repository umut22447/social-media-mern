import React from 'react';
import logo from '../../images/logo.png'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';

export default function Register({ setIsLoginPageActive }) {
    const { registerUser, authLoading } = useAuth();
    const { register, handleSubmit } = useForm();

    const handleRegister = async (data) => {
        const { firstName, lastName, username, email, password } = data;
        const registerResponse = await registerUser(firstName, lastName, username, email, password);

        //Cannot register
        if (registerResponse.errorMessage) return alert(registerResponse.errorMessage);

        //After register success open the login page
        setIsLoginPageActive(true);
    }

    return (
        <div className="form-container shadow">
            <img className="logo" alt="logo" src={logo} />
            <form onSubmit={handleSubmit(handleRegister)} className="w-75">
                <div className="form-group">
                    <label>First Name</label>
                    <input name="email" type="text" className="form-control" {...register("firstName")} required={true} />
                </div>
                <div className="form-group">
                    <label >Last Name</label>
                    <input name="password" type="text" className="form-control" {...register("lastName")} required={true} />
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input name="email" type="text" className="form-control" {...register("username")} required={true} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input name="email" type="text" className="form-control" {...register("email")} required={true} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" className="form-control" {...register("password")} required={true} />
                </div>
                <div className="button-group">
                    <button className="btn btn-outline-success mt-3" type='submit'>
                        {authLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : "Sign Up"}
                    </button>
                </div>
            </form>
            {authLoading ? null : <button className="btn btn-outline-info mt-3" onClick={() => { setIsLoginPageActive(true) }}>Sign In</button>}
        </div>
    )
}
