import React, { useState } from 'react';
import useForm from '../hooks/useForm';

function NewTaskForm(props) {
    console.log('new task form render')
    const [description, setDescription] = useState({});
    const { value, setValue } = props;
    console.log(`Value: ${value}`);
    let { values, handleChange, handleKeyDown, handleSubmit, error } = useForm({
        initialValues: {
            description: ''
        },
        slug: 'api/tasks/new'
    });

    const customHandleSubmit = (e) => {
        handleSubmit(e);
        setDescription('');
        values.description = '';
        setValue(!value); // attempting to lift state up into parent component -- HomePage with dummy state variable, in hopes of it re-rendering its children, which includes PendingTasks
        console.log(value);
    }

    const customHandleChange = (e) => {
        handleChange(e);
        setDescription(e.target.value);
    }

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2  col-lg-6 offset-lg-3 col-xxl-4 offset-xxl-4 col-10 offset-1">
                <form action="#" method="POST" onSubmit={customHandleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="description" name="description" className='mb-2 display-5 fw-bold text-light'>Add a Task</label>
                        <input type="text" className="form-control text-center" placeholder="description" id="description" name="description" value={values.description} onChange={customHandleChange} onKeyDown={handleKeyDown} required />
                    </div>
                    <button className="btn btn-light">Add</button>
                </form>
                <hr></hr>
            </div>
        </div>

    )
}

export default NewTaskForm;