import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import blankpp from '../../images/blankpp.png';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AccountEdit() {
    const { user, changeProfilePicture, updateUserData, authLoading } = useAuth();
    const { register, handleSubmit } = useForm();
    const [selectedImage, setSelectedImage] = useState(null);
    const [updateImageSection, setUpdateImageSection] = useState(false);
    const [updateUserButtonActive, setUpdateUserButtonActive] = useState(false);

    const toastOption = {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

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
        changeProfilePicture(profilePicture).then(res => {
            setUpdateImageSection(false);
            res.errorMessage ? toast.error(res.errorMessage, toastOption) : toast.success('Your profile picture has been successfully updated.', toastOption);
        });
    }

    const submitUserChanges = data => {
        const updatedData = {
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username
        }
        updateUserData(updatedData).then(res => {
            res.errorMessage ? toast.error(res.errorMessage, toastOption) : toast.success('Your account information has been successfully updated.', toastOption);
        });
    }

    return (
        <div className="edit-root">
            <h5 className="display-5 d-flex justify-content-center w-100 mb-3">Edit Profile</h5>
            <div className="m-3" style={{ width: '100%', borderBottom: '1px solid #e0e0e0' }} />
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
            <form onSubmit={handleSubmit(submitUserChanges)}>
                <div className="form-group">
                    <label>Email</label>
                    <input className="form-control" type="text" defaultValue={user.email} disabled />
                </div>
                <div className="form-group">
                    <label>Your Name</label>
                    <input className="form-control" type="text" defaultValue={user.firstName} {...register("firstName")} onChange={() => setUpdateUserButtonActive(true)} required />
                </div>
                <div className="form-group">
                    <label>Your Surname</label>
                    <input className="form-control" type="text" defaultValue={user.lastName} {...register("lastName")} onChange={() => setUpdateUserButtonActive(true)} required />
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input className="form-control" type="text" defaultValue={user.username} {...register("username")} onChange={() => setUpdateUserButtonActive(true)} required />
                </div>
                <div className="d-flex justify-content-center">
                    {updateUserButtonActive ? <button className="btn btn-outline-success mt-3" type="submit" disabled={authLoading}>{authLoading ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : "Save Changes"}</button> : null}
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}
