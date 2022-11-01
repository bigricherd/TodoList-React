import React, { useState, useEffect } from 'react';
import PendingTasks from './PendingTasks'
import CompletedTasks from './CompletedTasks';
import NewTaskForm from './NewTaskForm';

function TasksContainer(props) {
    const [isFetching, setIsFetching] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);
    const [pendingTasks, setPendingTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const fetchPendingTasks = async () => {
        const data = await fetch('/api/tasks/pending');
        try {
            const tasks = await data.json();
            setIsFetching(false);
            setPendingTasks(tasks);
        } catch (e) {
            setIsFetching(false);
        }
    }

    const fetchCompletedTasks = async () => {
        const data = await fetch('/api/tasks/completed');
        try {
            const items = await data.json();
            setIsFetching(false);
            setCompletedTasks(items);
        } catch (e) {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        setIsFetching(true);
        fetchPendingTasks();
        fetchCompletedTasks();
    }, []);

    let heading = null;
    let pendingTasksBlock = null;
    let newTaskForm = null;
    let completedTasksBlock = null;
    let toggleTasksButton = null;

    if (props.user) {
        heading = <p className='display-5 fw-bold text-light'>Tasks</p>;
        newTaskForm = <NewTaskForm liftState={setPendingTasks} />;
        pendingTasksBlock = <PendingTasks tasks={pendingTasks} updatePending={setPendingTasks} updateCompleted={setCompletedTasks} />; // I want this to re-render every time a new task is added
        completedTasksBlock = <CompletedTasks tasks={completedTasks} updateCompleted={setCompletedTasks} updatePending={setPendingTasks} />;

        // Radio button group that allows user to toggle between pending and completed tasks
        toggleTasksButton =
            <div className="btn-group mb-3" role="group" aria-label="Toggle tasks button group">

                {/* Pending option */}
                <input type="radio" className="btn-check" name="btnradio" id="pending" checked={!showCompleted} onChange={() => setShowCompleted(false)}></input>
                <label className="btn btn-outline-light" htmlFor="pending">Pending</label>

                {/* Completed option */}
                <input type="radio" className="btn-check" name="btnradio" id="completed" checked={showCompleted} onChange={() => setShowCompleted(true)}></input>
                <label className="btn btn-outline-light" htmlFor="completed">Completed</label>
            </div>;
    }

    // Update variable containing the PendingTasks component every time the list of pending tasks changes
    useEffect(() => {
        pendingTasksBlock = <PendingTasks tasks={pendingTasks} liftState={setPendingTasks} />;
    }, [pendingTasks]);

    // Update variable containing the CompletedTasks component every time the list of completed tasks changes
    useEffect(() => {
        completedTasksBlock = <CompletedTasks tasks={completedTasks} liftState={setCompletedTasks} />;
    }, [completedTasks]);

    return (

        <div className="pt-lg-1">
            {newTaskForm}
            <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xxl-4 offset-xxl-4 col-10 offset-1">
                {heading}
                {toggleTasksButton}
                {!showCompleted ? pendingTasksBlock : completedTasksBlock}
            </div>
        </div>
    )
}

export default TasksContainer;