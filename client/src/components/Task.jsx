import React, { useState } from 'react';
import deleteTask from '../hooks/deleteTask';
import editTask from '../hooks/editTask';
import completeTask from '../hooks/completeTask';
import undoCompleteTask from '../hooks/undoCompleteTask';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

function Task(props) {

    // --- EDIT TASK ---
    const [editing, setEditing] = useState(false);

    let editButtonText;
    editing ? editButtonText = "Cancel Edit" : editButtonText = "Edit";

    let editButton =
        <Button variant="light" className="d-inline mx-1" onClick={() => setEditing(!editing)}>
            {editButtonText}
        </Button>;

    const { editValues, handleChange, handleKeyDown, handleEdit, tasksPostEdit } = editTask({
        initialValues: {
            description: '',
            id: ''
        },
        slug: 'api/tasks'
    })

    const customHandleEdit = (e) => {
        editValues.id = props.id;
        setEditing(false);
        handleEdit(e);
    }

    let editForm =
        <div className="col-md-8 offset-md-2  col-10 offset-1">
            <form>
                <div className="mb-3">
                    <label htmlFor="description" name="description" className='mb-2 fw-bold'>Edit task description</label>
                    <input type="text" className="form-control text-center" placeholder="new description" id="description" name="description" defaultValue={props.description} onChange={handleChange} onKeyDown={handleKeyDown} required />
                </div>
                <button className="btn btn-light" onClick={(e) => { customHandleEdit(e) }}>Save Changes</button>
            </form>
        </div>;

    useEffect(() => {
        if (tasksPostEdit.length > 0) {
            props.updatePending(tasksPostEdit);
        }
    }, [tasksPostEdit])
    // --- END OF EDIT TASK ---

    // --- DELETE TASK --- 
    const { deleteValues, handleDelete, deleteError, tasksPostDelete } = deleteTask({
        initialValues: {
            id: '',
            completed: false
        },
        slug: 'api/tasks'
    })

    const customHandleDelete = (e) => {
        deleteValues.id = props.id;
        deleteValues.completed = props.completed;
        handleDelete(e);
    }

    let removeButton = <Button variant="danger" onClick={(e) => { customHandleDelete(e) }} >Remove </Button>

    // Update completed or pending tasks, depending on the status of the deleted task
    useEffect(() => {
        if (tasksPostDelete && tasksPostDelete.length >= 0) {
            console.log(tasksPostDelete);
            console.log(deleteValues.completed);
            deleteValues.completed === true ? props.updateCompleted(tasksPostDelete) : props.updatePending(tasksPostDelete);
        }
    }, [tasksPostDelete])
    // --- END OF DELETE TASK ---

    // --- COMPLETE TASK --- 
    const { completeValues, handleComplete, completeError, tasksPostComplete, completedTasksPostComplete } = completeTask({
        initialValues: {
            id: ''
        },
        slug: 'api/tasks/complete'
    })

    const customHandleComplete = (e) => {
        completeValues.id = props.id;
        handleComplete(e);
    }

    // Update pending tasks
    useEffect(() => {
        if (tasksPostComplete && tasksPostComplete.length >= 0) {
            props.updatePending(tasksPostComplete);
        }

    }, [tasksPostComplete]);

    // Update completed tasks
    useEffect(() => {
        if (completedTasksPostComplete && completedTasksPostComplete.length > 0) {
            props.updateCompleted(completedTasksPostComplete);
        }
    }, [completedTasksPostComplete]);
    // --- END OF COMPLETE TASK ---

    // --- UNDO COMPLETE TASK --- 
    const { undoCompleteValues, handleUndoComplete, undoCompleteError, tasksPostUndoComplete, completedTasksPostUndoComplete } = undoCompleteTask({
        initialValues: {
            id: ''
        },
        slug: 'api/tasks/undoComplete'
    })

    const customHandleUndoComplete = (e) => {
        undoCompleteValues.id = props.id;
        handleUndoComplete(e);
    }

    // Update pending tasks
    useEffect(() => {
        if (tasksPostUndoComplete && tasksPostUndoComplete.length > 0) {
            props.updatePending(tasksPostUndoComplete);
        }
    }, [tasksPostUndoComplete]);

    // Update completed tasks
    useEffect(() => {
        if (completedTasksPostUndoComplete && completedTasksPostUndoComplete.length >= 0) {
            props.updateCompleted(completedTasksPostUndoComplete);
        }
    }, [completedTasksPostUndoComplete]);
    // --- END OF UNDO COMPLETE TASK ---

    // Setting toggleCompleteButton depending on status of Task -- completed or not
    let toggleCompleteButton = <Button variant="success" onClick={(e) => { customHandleComplete(e) }}>Complete</Button>;

    // If this task is completed, i.e., being shown on the Completed Tasks page, then make the "complete button" an undo complete button
    if (props.completed) {
        toggleCompleteButton = <Button className="me-1" variant="light" onClick={(e) => { customHandleUndoComplete(e) }}>Move to pending</Button>
        editButton = null;
        editForm = null;
    }

    // Hide edit form if user is not editing
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