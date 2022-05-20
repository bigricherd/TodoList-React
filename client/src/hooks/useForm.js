import { useState } from 'react';
import axios from 'axios';
export default function useForm({ initialValues, slug, method }) {
    const [values, setValues] = useState(initialValues || {});
    const [error, setError] = useState(null);
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
    }
    //submit form when submit button is clicked
    const handleSubmit = event => {
        event.preventDefault();
        submitData({ values });
    };
    //send data to database
    const submitData = async (formValues) => {
        const url = 'https://desolate-everglades-14015.herokuapp.com';
        const dataObject = formValues.values;
        const { username, password } = dataObject;
        try {
            await axios({
                method: 'POST',
                url: `${url}/${slug}`,
                data: {
                    username: username,
                    password: password,
                },
                headers: new Headers({ 'Content-Type': 'application/json' }),
                withCredentials: true

            }).then(res => {
                console.log(res.data);
                if (res.data.redirect === '/') {
                    window.location = "/"; // redirects to home
                }
                else if (res.data.redirect === '/login') {
                    window.location = "/login";
                }
                setError(null);
            })
        } catch (err) {
            console.log(err);
            if (err.response.data.redirect === '/') {
                window.location = "/"; // redirects to home
            }
            else if (err.response.data.redirect === '/login') {
                window.location = "/login";
            }
            setError(err.response.data);
        }
    };
    return {
        handleChange,
        handleKeyDown,
        values,
        handleSubmit,
        error
    }
}