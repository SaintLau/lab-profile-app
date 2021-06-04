import React from 'react';
import service from './auth-service';
import { Redirect } from 'react-router-dom';

const Logout = props => {
    service
        .logout()
        .then((response) => {
            console.log("PROPSSS: ",props)
            props.callback(null);
            props.history.push("/")
        })
        .catch((error) => console.log(error));
    return <Redirect to={'/'} />;
}
export default Logout;