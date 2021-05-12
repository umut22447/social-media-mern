import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import blankpp from '../../images/blankpp.png';
import { useForm } from 'react-hook-form';

export default function AccountEdit() {
    const { user, changeProfilePicture } = useAuth();
    const { register, handleSubmit } = useForm();
    const [selectedImage, setSelectedImage] = useState(null);
    const [updateImageSection, setUpdateImageSection] = useState(false);

    const changeImagePreview = (e) => {
        var file = e.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
        }
        else {
            setSelectedImage(null);
        }
    }

    const submitProfilePicture = data => {
        const { profilePicture } = data;
        changeProfilePicture(profilePicture).then(() => {
            setUpdateImageSection(false);
        });
    }

    return (
        <div className="edit-root">
            <div className="profile-picture-section">
                <img alt={user.username + " avatar"} className="profile-picture" src={user && user.profilePicture && !selectedImage ? ("data:" + user.profilePicture.mimetype + ";base64," + user.profilePicture.buffer) : selectedImage ? selectedImage : blankpp} />
                {updateImageSection ?
                    <form onSubmit={handleSubmit(submitProfilePicture)}>
                        <div className="form-group">
                            <label>Profile Picture</label>
                            <br />
                            <input type="file" accept="image/png, image/jpeg" name="profilePicture" {...register("profilePicture")} onChange={changeImagePreview} required={true} />
                        </div>
                        {selectedImage ?
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                                <button className="btn btn-outline-success" type="submit">Update Profile Picture</button>
                            </div> : null}
                    </form> : <button className="btn btn-outline-success" onClick={() => { setUpdateImageSection(true) }}>Change Profile Picture</button>}
            </div>
        </div>
    )
}
