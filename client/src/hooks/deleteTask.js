import { useState } from 'react';
import axios from 'axios';
export default function useForm({ initialValues, slug, method }) {
    const [deleteValues, setDeleteValues] = useState(initialValues || {});
    const [deleteError, setDeleteError] = useState(null);
    const [tasksPostDelete, setTasksPostDelete] = useState(null);

    //submit form when submit button is clicked
    const handleDelete = event => {
        event.preventDefault();
        submitData({ deleteValues });
    };

    //send data to database
    const submitData = async (formValues) => {
        const dataObject = formValues.deleteValues;
        const { id, completed } = dataObject;
        try {
            await axios({
                method: 'DELETE',
                url: `/${slug}/${id}/${completed}`,
                withCredentials: true

            }).then(res => {
                setTasksPostDelete(res.data.tasks);
                setDeleteError(null);
                if (res.data.redirect === '/') {
                    window.location = "/"; // redirects to home
                }
                else if (res.data.redirect === '/login') {
                    window.location = "/login";
                }
            })
        } catch (err) {
            if (err.response.data.redirect === '/') {
                window.location = "/"; // redirects to home
            }
            else if (err.response.data.redirect === '/login') {
                window.location = "/login";
            }
            setDeleteError(err.response.data);
        }
    };
    return {
        deleteValues,
        handleDelete,
        deleteError,
        tasksPostDelete
    }
}