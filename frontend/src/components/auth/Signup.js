import React, { useState } from 'react';
import service from './auth-service';
import { Link } from 'react-router-dom';

const Signup = props => {

    const initialState = {
        username: "",
        password: "",
        campus: "Madrid",
        course: "Web Dev"
    }
    const [state, setState] = useState(initialState)

    const handleFormSubmit = event => {
        event.preventDefault();
        const username = state.username;
        const password = state.password;
        const campus = state.campus;
        const course = state.course

        service.signup(username, password, campus, course)
        .then(response => {
            setState({
                username: "",
                password: "",
                campus: "",
                course: ""
            });
            props.callback(response)
            props.history.push("/profile")
        })
        .catch(error => console.log(error))
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setState(state =>  ({
            ...state,
            [name]: value
        }));
    }

    return (
        <div>
            <form className="form-group m-2" onSubmit={handleFormSubmit} style={{maxWidth:"350px"}}>
                <label>Username:</label>
                <input className="form-control" 
                    type="text" 
                    name="username" 
                    value={state.username} 
                    placeholder="Enter your name"
                    onChange={handleChange} />

                <label>Password:</label>
                <input type="password" 
                    className="form-control" 
                    name="password" 
                    placeholder="Your password here"
                    value={state.password} 
                    onChange={handleChange} />
                
                <label>Select a campus:</label>
                <select className="form-control" name="campus" value={state.campus} onChange={handleChange}>
                    <option value="Madrid">Madrid</option>
                    <option value="Barcelona">Barcelona</option>
                    <option value="Miami">Miami</option>
                    <option value="Paris">Paris</option>
                    <option value="Berlin">Berlin</option>
                    <option value="Amsterdam">Amsterdam</option>
                    <option value="México">México</option>
                    <option value="Sao Paulo">São Paulo</option>
                    <option value="Lisbon">Lisbon</option>
                </select>

                <label>Select a course:</label>
                <select className="form-control" name="course" value={state.course} onChange={handleChange}>
                    <option value="Web Dev">Web Dev</option>
                    <option value="UX/UI">UX/UI</option>
                    <option value="Data Analytics">Data Analytics</option>
                </select>

                <input className="btn btn-secondary m-3" type="submit" value="Signup" />
            </form>

            <p className="m-2">
                Already have account?
                <Link to={"/login"}>Login</Link>
            </p>
        </div>
    )
}

export default Signup;