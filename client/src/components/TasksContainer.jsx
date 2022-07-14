import React, { useState, useEffect } from 'react';
import PendingTasks from './PendingTasks'
import CompletedTasks from './CompletedTasks';
import NewTaskForm from './NewTaskForm';
import { ThreeDots } from 'react-loading-icons';

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

    let message = null;
    let pendingTasksBlock = null;
    let newTaskForm = null;
    let completedTasksBlock = null;
    let toggleTasksButton = null;

    if (props.user) {
        message = <p className='display-5 fw-bold text-light'>Tasks</p>;
        newTaskForm = <NewTaskForm liftState={setPendingTasks} />;
        pendingTasksBlock = <PendingTasks tasks={pendingTasks} updatePending={setPendingTasks} updateCompleted={setCompletedTasks} />; // I want this to re-render every time a new task is added
        completedTasksBlock = <CompletedTasks tasks={completedTasks} updateCompleted={setCompletedTasks} updatePending={setPendingTasks} />;

        toggleTasksButton =
            <div className="btn-group mb-3" role="group" aria-label="Toggle tasks button group">
                <input type="radio" className="btn-check" name="btnradio" id="pending" checked={!showCompleted} onChange={() => setShowCompleted(false)}></input>
                <label className="btn btn-outline-light" htmlFor="pending">Pending</label>

                <input type="radio" className="btn-check" name="btnradio" id="completed" checked={showCompleted} onChange={() => setShowCompleted(true)}></input>
                <label className="btn btn-outline-light" htmlFor="completed">Completed</label>
            </div>;
    }

    useEffect(() => {
        pendingTasksBlock = <PendingTasks tasks={pendingTasks} liftState={setPendingTasks} />;
    }, [pendingTasks]);

    useEffect(() => {
        completedTasksBlock = <CompletedTasks tasks={completedTasks} liftState={setCompletedTasks} />;
    }, [completedTasks]);

    return (

        <div>
            {newTaskForm}
            <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xxl-4 offset-xxl-4 col-10 offset-1">
                {message}
                {toggleTasksButton}
                {!showCompleted ? pendingTasksBlock : completedTasksBlock}
            </div>
        </div>
    )
}

export default TasksContainer;