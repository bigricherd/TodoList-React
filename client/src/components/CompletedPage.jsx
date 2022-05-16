import React from 'react';
import { Link } from 'react-router-dom';
import CompletedTasks from './CompletedTasks';

function CompletedPage(props) {

    let loginMessage = <p className="pt-4"><Link to='/register' className='text-decoration-none d-inline'>Register</Link> or <Link to='/login' className='text-decoration-none d-inline'>Login</Link> first</p>;
    let completedTasks = null;

    if (props.user) {
        loginMessage = null;
        console.log('user is logged in');
        completedTasks = <CompletedTasks />
    }

    return (
        // <div className="pt-2 pt-lg-0 mt-3 mt-sm-4 mb-3">
        <div className="pt-3">
            <div className="row">
                {loginMessage}
                {completedTasks}
            </div>
        </div>
    )
}

export default CompletedPage;