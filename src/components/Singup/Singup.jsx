import React, { useContext, useState } from 'react';
import './Singup.css'
import { Link } from 'react-router-dom';
import AuthProvider, { authContext } from '../AuthProvider/AuthProvider';

const Singup = () => {

    const [error , setError] = useState('');
    const {registerNewUser} = useContext(authContext);

    const handleSubmit = event =>{
        event.preventDefault()
        const form = event.target;
        const email = form.email.value ;
        const password = form.password.value ;
        console.log(email, password);
        setError('');
        if(password.length < 6){
            setError('please enter 6 number');
            return 
        };
        registerNewUser( email,password)
        .then(result =>{
            const newUser = result.user;
            console.log(newUser);
            form.reset();
        })
        .catch(error =>{
            setError(error.message);
        })
        
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col ">
                <div className="text-center ">
                    <h1 className="text-5xl font-bold">Please Register Here</h1>
                </div>

                <form onSubmit={ handleSubmit } className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='text' placeholder="enter your name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" />
                            <p className='text-error'>{error}</p>
                            <label className="label">
                                <Link to='/login' className="label-text-alt link link-hover">already have account</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sing Up</button>
                        </div>
                        <button className="btn btn-wide btn-outline btn-success">Sing Up Google</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Singup;