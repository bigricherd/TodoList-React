import React, { useState } from 'react';
import PostButton from './PostButton';

function Task(props) {
    const [editing, setEditing] = useState(false);
    const editLink = `/api/tasks/${props.id}?_method=PATCH`;

    let editButtonText;
    editing ? editButtonText = "Cancel Edit" : editButtonText = "Edit";

    let editButton =
        <button className="btn btn-light d-inline mx-1" onClick={() => setEditing(!editing)}>
            {editButtonText}
        </button>;

    const handleSubmitEdit = (event) => {
        event.preventDefault();
        setEditing(false);
    }

    let editForm =
        <div className="col-md-8 offset-md-2  col-10 offset-1">
            <form action={editLink} method="POST">
                <div className="mb-3">
                    <label htmlFor="description" name="description" className='mb-2 fw-bold'>Edit task description</label>
                    <input type="text" className="form-control text-center" placeholder="new description" id="description" name="description" defaultValue={props.description} required />
                </div>
                <button className="btn btn-light" onSubmit={handleSubmitEdit}>Save Changes</button>
            </form>
        </div>;

    const completeLink = `/api/tasks/complete/${props.id}`;
    const deleteLink = `/api/tasks/${props.id}?_method=DELETE`;
    const undoCompleteLink = `/api/tasks/undoComplete/${props.id}`

    let toggleCompleteButton = <PostButton action={completeLink} buttonClasses={"btn-success"} text={"Complete"} />;
    let removeButton = <PostButton action={deleteLink} buttonClasses={"btn-danger"} text={"Remove"} />

    // If this task is completed, i.e., being shown on the Completed Tasks page, then make the "complete button" and undo complete button
    if (props.completed) {
        toggleCompleteButton = <PostButton action={undoCompleteLink} buttonClasses={"btn-light"} text={"Move to pending"} />
        editButton = null;
        editForm = null;
    }

    if (!editing) {
        editForm = null;
    }

    return (
        <div className="mb-1">
            <p className="d-inline mx-2">{props.description}</p>
            <div className="row mt-1 mb-2">
                <div className="col-md-8 offset-md-2 col-10 offset-1">
                    {toggleCompleteButton}
                    {editButton}
                    {removeButton}
                </div>
            </div>
            {editForm}
            <hr></hr>
        </div >
    )
}

export default Task;