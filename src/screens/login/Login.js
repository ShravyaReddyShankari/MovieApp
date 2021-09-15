import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import './Login.css';

const Login = (props) => {
    const [loginUserForm, setLoginUserForm] = useState({
        username: "",
        password: ""
    });
    const { username, password } = loginUserForm;

    const inputChangedHandler = (e) => {
        const state = loginUserForm;
        state[e.target.name] = e.target.value;
        setLoginUserForm({ ...state });
    }

    const loginUserHandler = async (e) => {
        const param = window.btoa(`${username}:${password}`);
        try {
            const rawResponse = await fetch("/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    authorization: `Basic ${param}`,
                    "Cache-Control": "no-cache",
                }
            });

            const result = await rawResponse.json();
            if (rawResponse.ok) {
                window.sessionStorage.setItem('user-details', JSON.stringify(result));
                window.sessionStorage.setItem('access-token', rawResponse.headers.get('access-token'));
                const modalIsOpenVar = false;
                props.onChange(e, modalIsOpenVar);
            } else {
                const error = new Error();
                error.message = result.message || 'Something went wrong.';
            }
        } catch (e) {
            alert(`Error: ${e.message}`);
        }
    }

    return (
        <div>
            <FormControl>
                <InputLabel className="login-input" htmlFor="username">Username*</InputLabel>
                <Input className="login-input" id="username" name="username" value={username} onChange={inputChangedHandler} required></Input>
            </FormControl>
            <br /><br />
            <FormControl>
                <InputLabel className="login-input" htmlFor="password">Password*</InputLabel>
                <Input className="login-input" id="password" name="password" value={password} type="password" onChange={inputChangedHandler} required></Input>
            </FormControl>
            <br /><br />
            <div className="login-button">
                <Button type="submit" variant="contained" color="primary" onClick={loginUserHandler}>
                    LOGIN
                </Button>
            </div>
            <br /><br />
        </div>
    )
}

export default Login;
