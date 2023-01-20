import { useState, useEffect } from 'react';
import Task from './Task';

function PendingTasks(props) {
    const [items, setItems] = useState(props.tasks);

    useEffect(() => {
        setItems(props.tasks);
    }, [props])

    let heading = null;
    let pendingTasks = null;

    // Set pendingTasks and heading conditionally, depending on if there are any tasks
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
