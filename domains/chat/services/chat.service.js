/**
 * ======================================================================
 * @파일    chat.service.js
 * @담당    박준모
 * @생성일  2024-08-03
 * @수정일  ---
 * @기능    chat(일반채팅) 관련 서비스 모듈
 * @설명
 * ---
 * ======================================================================
 */

import ChatRepository from '../repositories/chat.repository';

const chatRepository = new ChatRepository();

class ChatService {
  constructor() {}

  async createChatRoom(userId, bodyData) {
    return await chatRepository.insertChatRoom(userId, bodyData);
  }
}

export default ChatService;
