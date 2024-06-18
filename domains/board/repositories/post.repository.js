/**
 * ======================================================================
 * @파일    post.repository.js
 * @담당    박준모
 * @생성일  2024-06-18
 * @수정일  --- 
 * @기능    post(게시글) 관련 레포지토리 모듈
 * @설명    
 * ---
 * ======================================================================
 */

import prisma from '../../../prisma'

async function findPostById(postId) {
    return await prisma.post.findUniqueOrThrow({
        where: {
            id: Number(postId)
        }
    });
}

async function updatePost(postId, bodyData) {
    const { title, content } = bodyData;
    return await prisma.post.update({
        where: {
            id: Number(postId)
        },
        data: {
            title,
            content
        }
    });
}

async function deletePost(postId) {
    return await prisma.post.delete({
        where: {
            id: Number(postId)
        }
    });
}

export {
    findPostById,
    updatePost,
    deletePost
}