const POST_API_URL = "https://umern-api.herokuapp.com/api/posts";

module.exports.newPost = async (token, image, description) => {
    var formData = new FormData();
    formData.append('image', image[0]);
    formData.append('form-body', JSON.stringify({
        image,
        description
    }))
    return await fetch(POST_API_URL + '/new-post', {
        method: 'POST',
        headers: {
            'auth-token': token
        },
        body: formData
    }).then(res => res.json()).catch(err => err);
}

module.exports.getPostList = async (token, page) => {
    return await fetch(POST_API_URL, {
        method: 'POST',
        headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ page })
    }).then(res => res.json()).catch(err => err);
}

module.exports.getPostsByUserID = async (userID) => {
    return await fetch(POST_API_URL + '/' + userID).then(res => res.json()).catch(err => err);
}

module.exports.getPostByPostID = async (postID, token) => {
    return await fetch(POST_API_URL + '/post/' + postID, {
        method: 'GET',
        headers: {
            'auth-token': token
        }
    }).then(res => res.json()).catch(err => err);
}

module.exports.updatePostLikedUsers = async (postID, token) => {
    return await fetch(POST_API_URL + '/like', {
        method: 'POST',
        headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            postID: postID
        })
    }).then(res => res.json()).catch(err => err);
}