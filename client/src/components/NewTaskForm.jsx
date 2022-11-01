import React, { useState } from 'react';
import { useEffect } from 'react';
import addTask from '../hooks/addTask';

function NewTaskForm(props) {
    const [description, setDescription] = useState({});

    let { values, handleChange, handleKeyDown, handleSubmit, error, tasks } = addTask({
        initialValues: {
            description: ''
        }
    });

    // Customized handle submit function to reset description field every time a task is added
    const customHandleSubmit = (e) => {
        handleSubmit(e);
        setDescription('');
        values.description = '';
    }

    const customHandleChange = (e) => {
        handleChange(e);
        setDescription(e.target.value);
    }

    const customHandleKeyDown = (e) => {
        handleKeyDown(e);
        // Reset description field if enter key is pressed
        if (e.keyCode === 13) {
            setDescription('');
            values.description = '';
        }
    }

    useEffect(() => {
        props.liftState(tasks);
    }, [tasks]);

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2  col-lg-6 offset-lg-3 col-xxl-4 offset-xxl-4 col-10 offset-1">

                {/* New task form */}
                <form action="#" method="POST" onSubmit={customHandleSubmit}>

                    {/* Description input */}
                    <div className="mb-3">
                        <label htmlFor="description" name="description" className='mb-2 display-5 fw-bold text-light'>Add a Task</label>
                        <input type="text" className="form-control text-center" placeholder="description" id="description" name="description" value={values.description} onChange={customHandleChange} onKeyDown={customHandleKeyDown} required />
                    </div>

                    {/* Submit button */}
                    <button className="btn btn-light">Add</button>
                </form>
                <hr></hr>
            </div>
        </div>

    )
}

export default NewTaskForm;