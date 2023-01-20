import { useState } from 'react';
import axios from 'axios';
export default function useForm({ initialValues, slug, method }) {
    const [values, setValues] = useState(initialValues || {});
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);

    //track form values
    const handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        setValues({
            ...values,
            [name]: value
        });
    };

    //submit form when enter key is pressed
    const handleKeyDown = event => {
        const enter = 13;
        if (event.keyCode === enter) {
            handleSubmit(event);
        }
    };

    //submit form when submit button is clicked
    const handleSubmit = event => {
        event.preventDefault();
        submitData({ values });
    };

    const baseUrl = process.env.REACT_APP_HOME_URL || 'http://localhost:5000';

    //send data to database
    const submitData = async (formValues) => {
        const dataObject = formValues.values;
        const { username, password, description } = dataObject;
        try {
            await axios({
                method: 'POST',
                url: `/${slug}`,
                data: {
                    username: username,
                    password: password,
                    description: description
                },
                headers: new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' }),
                withCredentials: true

            }).then(res => {
                setTasks(res.data.tasks);
                setError(null);
                if (res.data.redirect === '/') {
                    window.location = "/"; // redirects to home page
                }
                else if (res.data.redirect === '/login') {
                    window.location = "/login"; // redirects to login page
                }
            })
        } catch (err) {
            if (err.response.data.redirect === '/') {
                window.location = "/"; // redirects to home page
            }
            else if (err.response.data.redirect === '/login') {
                window.location = "/login"; // redirects to login page
            }
            setError(err.response.data);
        }
    };
    return {
        handleChange,
        handleKeyDown,
        values,
        handleSubmit,
        error,
        tasks
    }
}