import React from 'react';
import useForm from '../hooks/useForm';
import Error from './Error';

function PostButton(props) {
    let formClasses = "d-inline mx-1";
    let buttonClasses = `btn ${props.buttonClasses}`;
    // console.log(props.slug);
    // const { handleSubmit, error } = useForm({
    //     slug: props.slug,
    //     method: props.method || 'POST'
    // });

    return (
        <form action={props.slug} className={formClasses} method="POST">
            <button className={buttonClasses} >{props.text}</button>
            {/* {error && <Error error={error.messages} />} */}
        </form>
    )
}

export default PostButton;