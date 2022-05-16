import React, { useState, useEffect } from 'react';
import Task from './Task';

function CompletedTasks() {
    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('/completedTasks');
        const items = await data.json();
        console.log(items);
        setItems(items);
    }

    let heading = <p className="pt-4">No completed tasks, get something done!</p>;
    let completedTasks = null;
    if (items && items.length !== 0) {
        heading = <p className="display-4 fw-bold">Completed Tasks</p>;
        completedTasks =
            items.map(item => (
                <Task description={item.description} key={item._id} id={item._id} completed={item.completed} />
            ))
    }

    return (
        <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xxl-4 offset-xxl-4 col-10 offset-1">
            {heading}
            {completedTasks}
        </div>
    )
}

export default CompletedTasks;
