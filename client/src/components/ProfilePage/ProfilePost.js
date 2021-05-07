import React from 'react';
import './style.css';

export default function ProfilePost(props) {
    const { image, description } = props.post;

    return (
        <img className="profile-post" alt={description} src={"data:" + image.mimetype + ";base64," + image.buffer} />
    )
}
