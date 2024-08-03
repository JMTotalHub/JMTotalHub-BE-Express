/**
 * ======================================================================
 * @파일    chat.repository.js
 * @담당    박준모
 * @생성일  2024-08-03
 * @수정일  ---
 * @기능    chat(일반채팅) 관련 레포지토리 모듈
 * @설명
 * ---
 * ======================================================================
 */

import prisma from '../../../prisma';

class ChatRepository {
  constructor() {}

  async insertChatRoom(userId, bodyData) {
    const { name, description, chat_type } = bodyData;
    return await prisma.chat_room.create({
      data: {
        name,
        description,
        chat_type,
        user_id: Number(userId),
      },
    });
  }
}

export default ChatRepository;
