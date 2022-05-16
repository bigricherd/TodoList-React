import React from 'react';

function PostButton(props) {
    let formClasses = "d-inline mx-1"
    let buttonClasses = `btn ${props.buttonClasses}`
    return (
        <form action={props.action} className={formClasses} method="POST">
            <button className={buttonClasses}>{props.text}</button>
        </form>
    )
}

export default PostButton;