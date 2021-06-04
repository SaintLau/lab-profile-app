import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UploadPhoto from './UploadPhoto'

const Profile = props => {
    const initialState = {
        showImageForm: false,
        image: props.loggedInUser.image
    }

    const [state, setState] = useState(initialState)

    const toggleUpload = event => {
        event.preventDefault()
        setState(state => ({
            ...state,
            showImageForm: !state.showImageForm
        }))
    }

    const handleUpdateProfilePicture = (newPicture) => {
        setState({
            showImageForm: false,
            image: newPicture
        })
    } 

    return (
        <div className="row">
            <div className="col">
                <h2>Welcome to your profile !</h2>
                <Link to={{
                    pathname: "/logout",
                    state: { loggedInUser: props.loggedInUser }
                    }}
                    style={{color:"#D0021B",fontWeight:"bold"}} className="btn">Logout</Link>
                </div>
            <div className="col">
                { state.image ?
                    <img style={{width:"150px"}} src={state.image} alt="You"/> : 
                    <img style={{width:"150px"}} src="https://techcommunity.microsoft.com/t5/image/serverpage/image-id/217078i525F6A9EF292601F/image-size/large?v=v2&px=999" alt="You"/>
                }
                <button className="btn btn-secondary" onClick={toggleUpload}>
                    { state.showImageForm ? "CLOSE" : "EDIT PHOTO" }
                </button>
                { state.showImageForm && <UploadPhoto {...props} loggedInUser={props.loggedInUser} updateProfilePicture={handleUpdateProfilePicture} /> }
            </div>
        </div>
    )
}

export default Profile