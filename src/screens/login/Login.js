import { FormControl } from '@material-ui/core';

const Login = () => {
    return (
        <div>
            <FormControl>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" required="true"></Input>
            {/* <Input id="username" aria-describedby="my-helper-text" /> */}
            {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" required="true"></Input>
            {/* <Input id="username" aria-describedby="my-helper-text" /> */}
            {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
            </FormControl>
        </div>
    )
}

export default Login;
