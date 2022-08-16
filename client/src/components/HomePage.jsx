import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TasksContainer from './TasksContainer';

function HomePage(props) {

    let message = null;

    if (!props.user) {
        message = <p className="pt-3 pt-lg-5" id="authPrompt"><Link to='/register' className='text-decoration-none d-inline'>Register</Link> or <Link to='/login' className='text-decoration-none d-inline'>Login</Link> first</p>;
    }

    return (
        <div className="row pt-3 pt-lg-4">
            {message}
            <TasksContainer user={props.user} />
        </div>
    )
}

export default HomePage;