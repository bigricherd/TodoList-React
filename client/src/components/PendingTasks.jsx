import React, { useState, useEffect } from 'react';
import Task from './Task';

function PendingTasks(props) {
    console.log('pending tasks render');
    console.log(props.tasks);
    console.log(typeof (props.tasks));
    console.log(Array.isArray(props.tasks));

    const [items, setItems] = useState(props.tasks);

    useEffect(() => {
        setItems(props.tasks);
    }, [props])

    let heading = null;
    let pendingTasks = null;

    if (items && items.length !== 0) {
        pendingTasks =
            items.map(item => (
                < Task description={item.description} key={item._id} id={item._id} completed={item.completed} updatePending={props.updatePending} updateCompleted={props.updateCompleted} />
            ));
    } else if (items && items.length === 0) {
        heading = <p className="pt-4">No outstanding tasks, what's next?</p>;
    } else {
        heading = null;
    }

    return (
        <div>
            {heading}
            {pendingTasks}
        </div>
    )
}

export default PendingTasks;
