import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const Homepage = props => {
    return(
        <div>
            { props.loggedInUser ? <Redirect to={'/profile'} /> :

            <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/signup" className="nav-link">Signup</Link>
            </>
            
            }
        </div>
    )
}

export default Homepage;