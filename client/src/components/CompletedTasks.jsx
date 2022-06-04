import React, { useState, useEffect } from 'react';
import Task from './Task';
import { ThreeDots } from 'react-loading-icons';

function CompletedTasks() {
    const [items, setItems] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const fetchItems = async () => {
        const data = await fetch('/api/tasks/completed');
        try {
            const items = await data.json();
            setIsFetching(false);
            setItems(items);
        } catch (e) {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        setIsFetching(true);
        fetchItems();
    }, []);

    let heading = null;
    let completedTasks = null;

    if (items && items.length !== 0) {
        completedTasks =
            items.map(item => (
                <Task description={item.description} key={item._id} id={item._id} completed={item.completed} />
            ))
    } else if (items && items.length === 0) {
        heading = <p className="pt-4">No completed tasks, get something done!</p>;
    } else {
        heading = null;
    }

    return (
        <div>
            {isFetching
                ? <ThreeDots className='mt-4' />
                : heading}
            {completedTasks}
        </div>
    )
}

export default CompletedTasks;
