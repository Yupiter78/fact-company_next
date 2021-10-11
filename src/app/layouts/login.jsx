import React, { useEffect, useState } from "react";
import TextField from "../components/textField";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [, setErrors] = useState();
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = {};
        for (const fieldName in data) {
            if (data[fieldName] === "") {
                errors[fieldName] = `${fieldName} isRequired`;
            }
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log("data:", data);
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
            />
            <TextField
                label="Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Login;
