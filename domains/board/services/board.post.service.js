import * as PostRepository from '../repositories/board.post.repository';


async function findPostList(boardId, queryData) {
    return await PostRepository.findPostListByBoardId(boardId, queryData);
}

async function createPost(boardId, postData) {
    return await PostRepository.insertPost(boardId, postData);
}

export {
    findPostList,
    createPost
}