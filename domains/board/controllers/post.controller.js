import * as PostService from '../services/post.service'

async function postDetails(req, res) {
    const { postId } = req.params;
    const post = await PostService.findPost(postId);
    res.status(200).json(post);
}

async function postModify(req, res) {
    const { postId } = req.params;
    const bodyData = req.body;
    const modifiedPost = await PostService.updatePost(postId, bodyData);
    res.status(200).json(modifiedPost);
}

async function postRemove(req, res) {
    const { postId } = req.params;
    await PostService.deletePost(postId);
    res.status(204).send();
}

export {
    postDetails,
    postModify,
    postRemove
}