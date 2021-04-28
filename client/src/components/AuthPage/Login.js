import React from 'react';
import logo from '../../images/logo.png'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Login({ setIsLoginPageActive }) {
    const { login, authLoading } = useAuth();
    const history = useHistory();
    const { register, handleSubmit } = useForm();

    const handleLogin = async (data) => {
        const { email, password } = data;
        const loginResponse = await login(email, password);

        //Cannot login
        if (loginResponse.errorMessage) return alert(loginResponse.errorMessage);

        //Login success
        history.push('/posts');
    }

    return (
        <div className="form-container shadow">
            <img className="logo" alt="logo" src={logo} />
            <form onSubmit={handleSubmit(handleLogin)} className="w-75">
                <div className="form-group">
                    <label>Email</label>
                    <input name="email" type="text" className="form-control" {...register("email")} required={true} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" className="form-control" {...register("password")} required={true} />
                </div>
                <div className="button-group">
                    <button className="btn btn-outline-success mt-3" type='submit' disabled={authLoading}>
                        {authLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : "Sign In"}
                    </button>
                </div>
            </form>
            {authLoading ? null : <button className="btn btn-outline-info mt-3" onClick={() => { setIsLoginPageActive(false) }}>Create Account</button>}
        </div>
    )
}
