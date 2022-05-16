import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import Error from './Error';

function Nav(props) {
    const { handleSubmit, error } = useForm({
        initialValues: {
            email: '',
            username: '',
            password: '',
        },
        slug: 'logout'
    });

    let navLinkClasses = 'nav-item nav-link';

    let navbarNav = <div className="navbar-nav ms-auto">
        {/* <Link to='/' className={navLinkClasses}>Todos</Link>
        <Link to='/completed' className={navLinkClasses}>Completed</Link> */}
        <Link to='/register' className={navLinkClasses}>Register</Link>
        <Link to='/login' className={navLinkClasses}>Login</Link>
        {error && <Error error={error.messages} />}
    </div>;

    if (props.user) {
        navbarNav = <div className="navbar-nav ms-auto">
            <Link to='/' className={navLinkClasses}>Pending</Link>
            <Link to='/completedTasks' className={navLinkClasses}>Completed</Link>
            <form action='#' onSubmit={handleSubmit} className={navLinkClasses} method='POST'><button className="border-0 bg-light">Logout | <span className="text-success">{props.user.username}</span></button></form>
        </div>
    }

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid mx-2">
                <a className="navbar-brand" href="/">To-do List</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar">
                    {navbarNav}
                </div>
            </div>
        </nav>
    )
}

export default Nav;