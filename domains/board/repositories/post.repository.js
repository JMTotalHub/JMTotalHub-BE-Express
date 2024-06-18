import prisma from "../../../prisma";

async function findPostListByBoardId(boardId, queryData) {

    // const { pageNum = 1, dataPerPage = 10, searchType, searchText, sortField = 'id', sortOrder = 'desc' } = queryData
    const { pageNum, dataPerPage, searchType, searchText, sortField, sortOrder } = queryData

    let where = {
        board_id: Number(boardId)
    }

    if (searchType && searchText) {
        where[searchType] = {
            contains: searchText
        };
    }

    const postList = await prisma.post.findMany({
        skip: (pageNum - 1) * dataPerPage,
        take: dataPerPage,
        where,
        orderBy: {
            [sortField]: sortOrder
        }
    })

    const totalDataCount = await prisma.post.count({ where });
    const totalPage = Math.ceil(totalDataCount / dataPerPage);

    return {
        postList,
        totalPage,
        pageNum
    }
}

async function insertPost(boardId, bodyData) {
    const { title, content } = bodyData;
    return await prisma.post.create({
        data: {
            title,
            content,
            board_id: Number(boardId)
        }
    });
}


export {
    findPostListByBoardId,
    insertPost
};
