import React, { useState } from 'react';
import service from './auth-service';
import { Link } from 'react-router-dom';

const Login = props => {

    const initialState = {
        username: "",
        password: ""
    };

    const [state, setState] = useState(initialState);

    const handleFormSubmit = event => {
        event.preventDefault();
        const username = state.username;
        const password = state.password;
        service.login(username, password)
        .then(response => {
            setState({
                username: "",
                password: ""
            });
            props.callback(response)
            props.history.push("/profile")
        })
        .catch(error => console.log(error));
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setState(state => ({
            ...state,
            [name]: value
        }));
    }

    return(
        <div>
            <form className="form-group m-2" onSubmit={handleFormSubmit} style={{maxWidth:"350px"}}>
                <label>Username:</label>
                <input className="form-control"
                    type="text"
                    name="username"
                    value={state.username}
                    placeholder="Enter your Username"
                    onChange={handleChange}
                />

                <label>Password:</label>
                <input className="form-control" 
                    type="password"
                    name="password"
                    placeholder="Your password goes here"
                    value={state.password}
                    onChange={handleChange}
                />

                <input type="submit" value="Login" />
            </form>

            <p>
                Don't have an account? Join us:
                <Link to={"/signup"}>Signup</Link>
            </p>
        </div>
    )
}

export default Login;