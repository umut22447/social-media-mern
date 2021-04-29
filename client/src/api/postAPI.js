module.exports.newPost = async (token, image, description) => {
    var formData = new FormData();
    formData.append('image', image[0]);
    formData.append('form-body', JSON.stringify({
        image,
        description
    }))
    return await fetch('http://localhost:9000/api/posts/new-post', {
        method: 'POST',
        headers: {
            'auth-token': token
        },
        body: formData
    }).then(res => res.json()).catch(err => err);
}

module.exports.getPostList = async (token) => {
    return await fetch('http://localhost:9000/api/posts', {
        method: 'GET',
        headers: {
            'auth-token': token
        }
    }).then(res => res.json()).catch(err => err);
}