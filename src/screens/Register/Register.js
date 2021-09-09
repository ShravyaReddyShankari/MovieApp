import { ValidatorForm } from 'react-material-ui-form-validator';
import TextValidator from 'react-material-ui-form-validator/lib/TextValidator';
const Register = () => {
    return (
        <div className="component-body-container">
            {/* <Link to="/"><button className="custom-btn">Back</button></Link> */}
            <ValidatorForm className="register-form" onSubmit={onFormSubmitted}>
                <TextValidator
                    id="firstName" 
                    label="First Name" 
                    type="text" 
                    name="firstName" 
                    //onChange={inputChangedHandler} 
                    //value={name}
                    validators={["required"]}
                    errorMessages={["required"]}
                >
                </TextValidator>
                <br /><br />
                <TextValidator
                    id="lastName" 
                    label="Last Name" 
                    type="text" 
                    name="lastName" 
                    //onChange={inputChangedHandler} 
                    //value={name}
                    validators={["required"]}
                    errorMessages={["required"]}
                >
                </TextValidator>
                <br /><br />
                <TextValidator
                    id="email" 
                    label="Email" 
                    type="text" 
                    name="email" 
                    //onChange={inputChangedHandler} 
                    //value={name}
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
                    //onChange={inputChangedHandler} 
                    //value={name}
                    validators={["required"]}
                    errorMessages={["required"]}
                >
                </TextValidator>
                <br /><br />
                <TextValidator
                    id="contactNo" 
                    label="Contact No." 
                    type="text" 
                    name="contactNo" 
                    //onChange={inputChangedHandler} 
                    //value={name}
                    validators={["required"]}
                    errorMessages={["required"]}
                >
                </TextValidator>
                <br /><br />
                <button type="submit" className="custom-btn add-btn">REGISTER</button>
            </ValidatorForm>
        </div>
    )
}