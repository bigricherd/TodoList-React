import React from 'react';
import useForm from '../hooks/useForm';
import Error from './Error';


function Register() {
    const { values, handleChange, handleKeyDown, handleSubmit, error } = useForm({
        initialValues: {
            username: '',
            password: '',
        },
        slug: 'register'
    });

    return (
        <div className="card-shadow">
            <div className="card-body d-flex flex-column align-items-center">
                <h5 className="card-header display-4 fw-bold">Register</h5>
                <form action="#" method="POST" onSubmit={handleSubmit} className="card-body d-flex flex-column align-items-center">
                    <div className="mb-3 text-start">
                        <label htmlFor="username" name="username" className='form-label'>Username</label>
                        <input type="text" className="form-control" placeholder="Username" id="username" name="username" value={values.username} onChange={handleChange} onKeyDown={handleKeyDown} required />
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="password" name="password" className='form-label'>Password</label>
                        <input type="password" className="form-control" placeholder="Password" id="password" name="password" value={values.password} onChange={handleChange} onKeyDown={handleKeyDown} required />
                    </div>
                    <button className="btn btn-primary mb-3">Register</button>
                    {error && <Error error={error.messages} />}
                </form>
            </div>
        </div>
    )
}

export default Register;