import React, { useState } from 'react';
import { useEffect } from 'react';
import useForm from '../hooks/useForm';

function NewTaskForm(props) {
    console.log('new task form render')
    const [description, setDescription] = useState({});

    let { values, handleChange, handleKeyDown, handleSubmit, error, tasks } = useForm({
        initialValues: {
            description: ''
        },
        slug: 'api/tasks/new'
    });

    const customHandleSubmit = (e) => {
        handleSubmit(e);
        setDescription('');
        values.description = '';
    }

    const customHandleChange = (e) => {
        handleChange(e);
        setDescription(e.target.value);
    }

    useEffect(() => {
        console.log(tasks);
        console.log(Array.isArray(tasks));
        // const t = tasks.length > 0 && tasks.substring(1, tasks.length - 1);
        // console.log(t);
        // const arr = t.split(',');
        // const tasksArray = [];
        // for (let i = 0; i < arr.length; i + 5) {
        //     const newObject = {}
        // }
        // console.log(arr);
        // console.log(Array.isArray(arr));
        props.liftState(tasks);
    }, [tasks]);

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