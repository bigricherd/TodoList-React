import React from 'react';
import NewTaskForm from './NewTaskForm';
import PendingTasks from './PendingTasks'
// import UserInfo from './UserInfo';
import { Link } from 'react-router-dom';

function HomePage(props) {

    let loginMessage = <p className="pt-4"><Link to='/register' className='text-decoration-none d-inline'>Register</Link> or <Link to='/login' className='text-decoration-none d-inline'>Login</Link> first</p>;
    let newTaskForm = null;
    let pendingTasks = null;

    if (props.user) {
        loginMessage = null;
        newTaskForm = <NewTaskForm />;
        pendingTasks = <PendingTasks />;
    }

    return (
        <div className="pt-3">
            {newTaskForm}
            <div className="row">
                {loginMessage}
                {pendingTasks}
            </div>
        </div>
    )
}

export default HomePage;