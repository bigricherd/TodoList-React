import React, { useState, useEffect } from 'react';
import Task from './Task';
import { ThreeDots } from 'react-loading-icons';

function PendingTasks(props) {
    const [items, setItems] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const fetchItems = async () => {
        const data = await fetch('/api/tasks/pending');
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
    let pendingTasks = null;

    if (items && items.length !== 0) {
        pendingTasks =
            items.map(item => (
                <Task description={item.description} key={item._id} id={item._id} completed={item.completed} />
            ))
    } else if (items && items.length === 0) {
        heading = <p className="pt-4">No outstanding tasks, what's next?</p>;
    } else {
        heading = null;
    }

    return (
        <div>
            {isFetching
                ? <ThreeDots className='mt-4' />
                : heading}
            {pendingTasks}
        </div>
    )
}

export default PendingTasks;
