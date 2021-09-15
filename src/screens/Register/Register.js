import React, { useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import './Register.css';

const Register = (props) => {
    const [registerUserForm, setregisterUserForm] = useState({
        id: 0,
        email_address: "",
        first_name: "",
        last_name: "",
        mobile_number: "",
        password: ""
    });
    const { email_address, first_name, last_name, mobile_number, password } = registerUserForm;
    const [registrationMessage, setRegistrationMessage] = useState('');

    const inputChangedHandler = (e) => {
        const state = registerUserForm;
        state[e.target.name] = e.target.value;
        setregisterUserForm({ ...state });
    }

    async function registerUserHandler(newUser) {
        try {
            const rawResponse = await fetch(props.baseUrl + "signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Cache-Control": "no-cache",
                    },
                    body: JSON.stringify(newUser)
                });
            if (rawResponse.ok) {
                const data = await rawResponse.json();
                if (data.message === undefined) {
                    setRegistrationMessage("Registration Successful. Please Login!");
                }
                else {
                    setRegistrationMessage(data.message);
                }
            }
            else {
                const error = new Error();
                error.message = "Something went wrong.";
                throw error;
            }
        }
        catch (e) {
            console.log(e);
        }

    }

    const onFormSubmitted = (e) => {
        e.preventDefault();
        registerUserHandler(registerUserForm);
    }

    return (
        <div className="component-body-container">
            <ValidatorForm className="register-form" onSubmit={onFormSubmitted} noValidate={true}>
                <TextValidator
                    id="first_name"
                    label="First Name"
                    type="text"
                    name="first_name"
                    onChange={inputChangedHandler}
                    required
                    value={first_name}
                    validators={["required"]}
                    errorMessages={["required"]}
                >
                </TextValidator>
                <br /><br />
                <TextValidator
                    id="last_name"
                    label="Last Name"
                    type="text"
                    name="last_name"
                    onChange={inputChangedHandler}
                    required
                    value={last_name}
                    validators={["required"]}
                    errorMessages={["required"]}
                >
                </TextValidator>
                <br /><br />
                <TextValidator
                    id="email_address"
                    label="Email"
                    type="text"
                    name="email_address"
                    onChange={inputChangedHandler}
                    required
                    value={email_address}
                    validators={["required", "isEmail"]}
                    errorMessages={["required", "invalid email"]}
                >
                </TextValidator>
                <br /><br />
                <TextValidator
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    onChange={inputChangedHandler}
                    required
                    value={password}
                    validators={["required"]}
                    errorMessages={["required"]}
                >
                </TextValidator>
                <br /><br />
                <TextValidator
                    id="mobile_number"
                    label="Contact No."
                    type="text"
                    name="mobile_number"
                    onChange={inputChangedHandler}
                    required
                    value={mobile_number}
                    validators={["required"]}
                    errorMessages={["required"]}
                >
                </TextValidator>
                <br /><br />
                <p>{registrationMessage}</p>
                <Button type="submit" className="register-button" variant="contained" color="primary">
                    REGISTER
                </Button>
            </ValidatorForm>
        </div>
    )
}

export default Register;