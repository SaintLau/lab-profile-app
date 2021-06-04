import React, { useState } from 'react';
import service from './auth-service';


const UploadPhoto = props => {
    const initialState = {
        image: "",
        archive: null,
        submitButtonDisabled: true
    }

    const [state, setState] = useState(initialState)

    const handleFileUpload = e => {
        const { target } = e
        console.log(target.files)
        setState(state => ({
            ...state,
            archive: target.files[0]
        }))
        setState(state => ({
            ...state,
            submitButtonDisabled: false
        }))
    };

    const handleSave = e => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append("image", state.archive);
        uploadData.append("user", props.loggedInUser._id);
        service.upload(uploadData)
          .then((response) => {
            props.updateProfilePicture(response.path)
          });
    };

    return (
        <div>
            <form className="form-group" onSubmit={handleSave}>
                <input type="file" name="image" onChange={handleFileUpload} />   
                { state.submitButtonDisabled ? 
                    <input disabled className="btn btn-primary" disabled type="submit" value="Submit" /> :
                    <input className="btn btn-primary" type="submit" value="Submit" />
                }             
                
            </form>
        </div>
    )
}

export default UploadPhoto;
