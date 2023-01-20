import { useState } from 'react';
import axios from 'axios';
export default function useForm({ initialValues, slug, method }) {
    const [editValues, setEditValues] = useState(initialValues || {});
    const [editError, setEditError] = useState(null);
    const [tasksPostEdit, setTasksPostEdit] = useState([]);
    //track form values
    const handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        setEditValues({
            ...editValues,
            [name]: value
        });
    };
    //submit form when enter key is pressed
    const handleKeyDown = event => {
        const enter = 13;
        if (event.keyCode === enter) {
            handleEdit(event);
        }
    }
    //submit form when submit button is clicked
    const handleEdit = event => {
        event.preventDefault();
        submitData({ editValues });
    };

    const baseUrl = process.env.REACT_APP_HOME_URL || 'http://localhost:5000';

    //send data to database
    const submitData = async (formValues) => {
        const dataObject = formValues.editValues;
        const { id, description } = dataObject;
        try {
            await axios({
                method: 'PATCH',
                url: `/${slug}/${id}`,
                data: {
                    description
                },
                headers: new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' }),
                withCredentials: true

            }).then(res => {
                setTasksPostEdit(res.data.tasks);
                setEditError(null);
                if (res.data.redirect === '/') {
                    window.location = "/"; // redirects to home
                }
                else if (res.data.redirect === '/login') {
                    window.location = "/login";
                }
            })
        } catch (err) {
            console.log(err);
            if (err.response.data.redirect === '/') {
                window.location = "/"; // redirects to home
            }
            else if (err.response.data.redirect === '/login') {
                window.location = "/login";
            }
            setEditError(err.response.data);
        }
    };
    return {
        handleChange,
        handleKeyDown,
        editValues,
        handleEdit,
        editError,
        tasksPostEdit
    }
}