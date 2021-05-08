import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { usePost } from '../../contexts/PostContext';
import Header from '../Header/Header';
import './style.css';

export default function NewPostPage() {
    const { addNewPost } = usePost();
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const [selectedImage, setSelectedImage] = useState(null);

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

    const submitPost = data => {
        const { image, description } = data;
        addNewPost(image, description).then(() => {
            history.push('/posts');
        });
    }

    return (
        <div>
            <Header />
            <form className="form-root" onSubmit={handleSubmit(submitPost)}>
                {selectedImage ? <img src={selectedImage} className="selected-image-preview" /> : <strong style={{ marginBottom: 20 }}>No Image Selected</strong>}
                <div className="form-group">
                    <input type="file" accept="image/png, image/jpeg" name="image" {...register("image")} onChange={changeImagePreview} required={true} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input name="description" type="text" className="form-control" {...register("description")} required={true} />
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                    <button className="btn btn-outline-success" type="submit">Create a Post</button>
                </div>
            </form>
        </div>
    )
}
