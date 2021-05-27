const COMMENT_API_URL = "http://localhost:9000/api/comments";

module.exports.getComments = async (postID) => {
    return await fetch(COMMENT_API_URL + "/get-comments/" + postID).then(res => res.json()).catch(err => err);
}

module.exports.addNewComment = async (postID, commentText, token) => {
    return await fetch(COMMENT_API_URL + "/new-comment", {
        method: 'POST',
        headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            postID: postID,
            commentText: commentText
        })
    }).then(res => res.json()).catch(err => err);
}