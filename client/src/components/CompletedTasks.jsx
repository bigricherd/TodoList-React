import React, { useState, useEffect } from 'react';
import Task from './Task';

function CompletedTasks(props) {
    const [items, setItems] = useState(props.tasks);

    useEffect(() => {
        setItems(props.tasks);
    }, [props])

    let heading = null;
    let completedTasks = null;

    if (items && items.length !== 0) {
        completedTasks =
            items.map(item => (
                <Task description={item.description} key={item._id} id={item._id} completed={item.completed} updateCompleted={props.updateCompleted} updatePending={props.updatePending} />
            ))
    } else if (items && items.length === 0) {
        heading = <p className="pt-4">No completed tasks, get something done!</p>;
    } else {
        heading = null;
    }

    return (
        <div>
            {heading}
            {completedTasks}
        </div>
    )
}

export default CompletedTasks;
