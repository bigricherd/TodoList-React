import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className='alert alert-warning col-lg-6 offset-lg-3 col-xxl-4 offset-xxl-4 col-8 offset-2'>
        <h1 >404 - NOT FOUND</h1>
        <Link to="/" className='nav-item nav-link text-warning'>Back to Home</Link>
    </div>
);

export default NotFound;