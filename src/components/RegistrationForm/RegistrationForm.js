import React, {useState} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import { useForm } from 'react-hook-form';
import {API_BASE_URL} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";

function RegistrationForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        confirmPassword: "",
        deviceid: "",
        devicename: "",
        macaddress: "",
        successMessage: null
    })

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = (data, e) => {
        e.target.reset();
    }

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
        if(state.email.length && state.password.length) {
            props.showError(null);
            const payload={
                "email":state.email,
                "password":state.password,
                "deviceid" : state.deviceid,
                "devicename" : state.devicename,
                "macaddress": state.macaddress,
            }
            axios.post(API_BASE_URL+'SignUp/frontendsignup', payload)
                .then(function (response) {
                    if(response.data.code === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registration successful. Redirecting to home page..'
                        }))
                        redirectToConfirm();
                        props.showError(null)
                    } else{
                        props.showError("Some error ocurred: "+response.data.message);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        } else {
            props.showError('Please enter valid username and password')    
        }
        
    }
    const redirectToConfirm = () => {
        props.updateTitle('Confirm Account')
        props.history.push('/confirm');
    }
    
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login'); 
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()    
        } else {
            props.showError('Passwords do not match');
        }
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                       name="email"
                       ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                       

                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange}
                        name="pass" 
                        ref={register({ required: true })} 
                        
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        name="confPass"
                        onChange={handleChange} 
                        ref={register({ required: true })} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Device ID </label>
                    <input type="text" 
                        className="form-control" 
                        id="deviceid" 
                        placeholder="Device ID"
                        value={state.deviceid}
                        onChange={handleChange}
                        name="deviceid" 
                        ref={register({ required: true })} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Device Name </label>
                    <input type="text" 
                        className="form-control" 
                        id="devicename" 
                        placeholder="Device Name"
                        value={state.devicename}
                        onChange={handleChange}
                        name="devicename" 
                        ref={register({ required: true })} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Mac Address</label>
                    <input type="text" 
                        className="form-control" 
                        id="macaddress" 
                        placeholder="Mac Address"
                        value={state.macaddress}
                        onChange={handleChange}
                        name="macaddress" 
                        ref={register({ required: true })} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Send
                </button>
                <input className="btn btn-primary mx-3"
                    type="reset"
                    value="Reset"
                    onClick={() => reset()}
                />
                
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
            </div>
            
        </div>
    )
}

export default withRouter(RegistrationForm);