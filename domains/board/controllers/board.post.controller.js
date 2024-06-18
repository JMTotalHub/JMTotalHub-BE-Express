import * as PostService from '../services/board.post.service'

async function postList(req, res) {
    const { boardId } = req.params;
    const queryData = req.query;
    const postList = await PostService.findPostList(boardId, queryData);
    res.status(200).json(postList);
}

async function postAdd(req, res) {
    const { boardId } = req.params;
    const postData = req.body;
    const createdPost = await PostService.createPost(boardId, postData);
    res.status(201).json(createdPost);
}

export {
    postList,
    postAdd
}