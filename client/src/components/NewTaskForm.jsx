import React from 'react';

function NewTaskForm() {
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className="row">
            <div className="col-md-8 offset-md-2  col-lg-6 offset-lg-3 col-xxl-4 offset-xxl-4 col-10 offset-1">
                <form action="/api/tasks/new" method="POST">
                    <div className="mb-3">
                        <label htmlFor="description" name="description" className='mb-2 display-5 fw-bold text-light'>Add a Task</label>
                        <input type="text" className="form-control text-center" placeholder="description" id="description" name="description" required />
                    </div>
                    <button className="btn btn-light" onSubmit={handleSubmit}>Add</button>
                </form>
                <hr></hr>
            </div>
        </div>

    )
}

export default NewTaskForm;