import React, {useState} from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
//import TextValidator from 'react-material-ui-form-validator/lib/TextValidator';
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

    const {email_address, first_name, last_name, mobile_number, password} = registerUserForm;

    //const history = useHistory();

    const inputChangedHandler = (e) => {
        const state = registerUserForm;
        console.log(e.target.value);
        state[e.target.name] = e.target.value;
        // setregisterUserForm({
        //     first_name: state["first_name"],
        //     last_name: state["last_name"],
        //     mobile_number: state["mobile_number"],
        //     password: state["password"],
        //     email_address: state["email_address"]
        // });
        setregisterUserForm({...state});
    }
    async function registerUserHandler(newUser) {
        const rawResponse = await fetch("/api/v1/signup", 
        {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Cache-Control": "no-cache"
        },
        body: JSON.stringify(newUser)
        });
        const data = await rawResponse.json();
        console.log(data);
    }

    const onFormSubmitted = (e) => {
        e.preventDefault();
        registerUserHandler(registerUserForm);
        const modalIsOpenVar = false;
        props.onChange(e, modalIsOpenVar);
        //setregisterUserForm({id: 0, name: '', phone: ''});
        //history.push("/");
    }

    return (
        <div className="component-body-container">
            {/* <Link to="/"><button className="custom-btn">Back</button></Link> */}
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
                    validators={["required"]}
                    errorMessages={["required"]}
                >
                </TextValidator>
                <br /><br />
                <TextValidator
                    id="password" 
                    label="Password" 
                    type="text" 
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
                {/* <button type="submit" className="custom-btn add-btn">REGISTER</button> */}
                <Button type="submit" className="register-button" variant="contained" color="primary">
                    REGISTER
                </Button>
            </ValidatorForm>
        </div>
    )
}

export default Register;