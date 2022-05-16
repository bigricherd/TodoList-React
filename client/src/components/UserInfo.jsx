import React, { useState, useEffect } from 'react';

function UserInfo() {
    useEffect(() => {
        getUser();
    }, []);

    const [user, setUser] = useState(null);

    const getUser = async () => {
        const data = await fetch('/user');
        const user = await data.json();
        console.log(user);
        setUser(user);
    }

    let userInfo = null;

    if (user) {
        userInfo = <div className="card bg-dark">
            <div className="card-body">
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
            </div>
        </div>
    }

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xxl-4 offset-xxl-4 col-10 offset-1">
                {userInfo}
            </div>
        </div>
    )
}

export default UserInfo;