import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { signIn, googleSignIn, updateUser } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [userEmail, setuserEmail] = useState('')
    const [token] = useToken(userEmail);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true })
    }

    const handleLogin = data => {
        setLoginError('')
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                setuserEmail(data.email)
                console.log(user)
            })
            .catch(error => {
                console.log(error.message);
                setLoginError(error.message);
            })
    }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                updateUser(user.displayName)
                    .then(() => {
                        saveUser(user.displayName, user.email)
                    })
                    .catch(error => console.log(error))
                navigate(from, { replace: true })
            })
            .catch(error => {
                setLoginError(error.message);
                console.log(error)
            })
    }
    const saveUser = (name, email) => {
        const user = { name, email }
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setuserEmail(email);
            })
    }

    return (
        <div className='h-2/3 text-center flex justify-center items-center'>
            <div className='w-96 p-6'>
                <h2 className='text-2xl'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input
                            {...register("email",
                                { required: "Email Address is required" })}
                            type='text' className="input input-bordered w-full max-w-xs" />
                    </div>
                    {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input
                            {...register("password",
                                {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be 6 characters" }
                                })}
                            type='password' className="input input-bordered w-full max-w-xs" />
                        <label className="label"><span className="label-text-alt">Forgot Password?</span> </label>
                    </div>
                    {errors.password && <p className='text-red-600' role="alert">{errors.password?.message}</p>}
                    {loginError && <p className='text-red-900'>{loginError}</p>}
                    <input className='mb-3 w-full btn btn-accent' value="LOGIN" type="submit" />
                    <p>New to Doctors Portal <Link to='/signup' className='text-secondary'>Create New Account</Link> </p>
                    <div className="divider">OR</div>
                </form>
                <button onClick={handleGoogleLogin} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;