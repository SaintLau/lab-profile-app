import React, { useState } from "react";
import './App.css'
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import { Route, Switch } from 'react-router-dom'
import Homepage from "./components/Homepage";
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "./components/auth/Profile";
import Logout from "./components/auth/Logout";
import service from "./components/auth/auth-service"
import ProtectedRoute from "./components/auth/protected-route";

const App = () => {
  const initialState = {
    loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')) || null
  }

  const [state, setState] = useState(initialState)

  const getTheUser = (userObj) => {
    setState({
      loggedInUser: userObj
    })
    setState({
      loggedInUser: userObj
    }, () => {
      localStorage.setItem('loggedInUser', JSON.stringify(state.loggedInUser))
    })
  }

  const fetchUser = () => {
    if( state.loggedInUser === null ){
      service.loggedin()
      .then(response =>{
        setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  fetchUser()

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={props => <Homepage {...props} loggedInUser={state.loggedInUser} callback={getTheUser} />} />
        <Route exact path="/signup" render={props => <Signup {...props} callback={getTheUser} />} />
        <Route exact path="/login" render={props => <Login {...props} callback={getTheUser} />} />
        <Route exact path="/logout" render={(props) => <Logout {...props} callback={getTheUser} />} />
        <ProtectedRoute exact path="/profile" user={state.loggedInUser} component={Profile} />
        {/* <Route exact path="/profile" render={props => <Profile {...props} loggedInUser={state.loggedInUser} />} /> */}
      </Switch>
    </div>
  );
}

export default App;
