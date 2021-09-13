import React, {useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

const Login = (props) => {
    const [loginUserForm, setLoginUserForm] = useState({
        username: "",
        password: ""
      });

    const {username, password} = loginUserForm;

    //const history = useHistory();

    const inputChangedHandler = (e) => {
        const state = loginUserForm;
        state[e.target.name] = e.target.value;
        // setregisterUserForm({
        //     first_name: state["first_name"],
        //     last_name: state["last_name"],
        //     mobile_number: state["mobile_number"],
        //     password: state["password"],
        //     email_address: state["email_address"]
        // });
        setLoginUserForm({...state});
    }

    const loginUserHandler = async (e) => {
        const param = window.btoa(`${username}:${password}`);
        try {
            const rawResponse = await fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    authorization: `Basic ${param}`
                }
            });

            const result = await rawResponse.json();
            if(rawResponse.ok) {
                window.sessionStorage.setItem('user-details', JSON.stringify(result));
                window.sessionStorage.setItem('access-token', rawResponse.headers.get('access-token'));
                const modalIsOpenVar = false;
                props.onChange(e, modalIsOpenVar);
                //window.location.href = './boards.html';
            } else {
                const error = new Error();
                error.message = result.message || 'Something went wrong.';
            }
        } catch(e) {
            alert(`Error: ${e.message}`);
        }
    }

    return (
        <div>
            <FormControl>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" name="username" value={username} onChange={inputChangedHandler} required></Input>
            {/* <Input id="username" aria-describedby="my-helper-text" /> */}
            {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
            </FormControl>
            <br /><br />
            <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" name="password" value={password} onChange={inputChangedHandler} required></Input>
            {/* <Input id="username" aria-describedby="my-helper-text" /> */}
            {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
            </FormControl>
            <br /><br />
            <Button variant="contained" color="primary" onClick={loginUserHandler}>
                LOGIN
            </Button>   
            <br /><br />     
            </div>
    )
}

export default Login;
