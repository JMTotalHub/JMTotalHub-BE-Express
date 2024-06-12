const { PrismaClient } = require('@prisma/client')

const prisma = PrismaClient();

async function findPostList(pageNum=1, dataPerPage=10, searchType, searchText, sortField = 'id', sortOrder='desc') {

    let where = {}

    // 검색정보 있어야  where절 생성
    // mode 통해 대소문자 구별안하는 걸로 설정
    if (searchType && searchText) {
        where[searchType] = {
            contains: searchText,
            mode: 'insensitive' 
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

    // 총 데이터개수
    const totalDataCount = await prisma.board.count();
    // 총 페이지수
    const totalPage = Math.ceil(totalDataCount / dataPerPage);

    return {
        postList,
        totalPage
    }
}

async function createPost(data) {
    const { title, content, board_id } = data 
}