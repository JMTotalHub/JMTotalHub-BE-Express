import * as PostRepository from '../repositories/post.repository';


async function findPostList(boardId, queryData) {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    console.log(queryData);
    return await PostRepository.findPostListByBoardId(boardId, queryData);
}

async function createPost(boardId, postData) {
    return await PostRepository.insertPost(boardId, postData);
}

export {
    findPostList,
    createPost
}