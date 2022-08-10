import { Link } from 'react-router-dom';

function Nav(props) {
    let navLinkClasses = 'nav-item nav-link';

    // If there is no user logged in, populate navbar contents with Register and Login links
    let navbarNav = <div className="navbar-nav ms-auto">
        <Link to='/register' className={navLinkClasses}>Register</Link>
        <Link to='/login' className={navLinkClasses}>Login</Link>
    </div>;

    // If a user is logged in, logout button in navbar contents
    if (props.user) {
        navbarNav = <div className="navbar-nav ms-auto">
            <Link to='/' className={navLinkClasses}>Tasks</Link>
            <form action='/api/users/logout' className={navLinkClasses} method='POST'><button className="border-0 bg-light">Logout | <span className="text-success">{props.user.username}</span></button></form>
        </div>
    }

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid mx-2">

                {/* Link to home */}
                <a className="navbar-brand" href="/">To-do List</a>

                {/* Hamburger icon */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar contents */}
                <div className="collapse navbar-collapse" id="navbar">
                    {navbarNav}
                </div>
            </div>
        </nav>
    )
}

export default Nav;