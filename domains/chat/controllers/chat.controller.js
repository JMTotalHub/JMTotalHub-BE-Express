/**
 * ======================================================================
 * @파일    chat.controller.js
 * @담당    박준모
 * @생성일  2024-08-03
 * @수정일  ---
 * @기능    chat(일반채팅) 관련 컨트롤러 모듈
 * @설명
 * ---
 * ======================================================================
 */

import ChatService from '../services/chat.service';

const chatService = new ChatService();

class ChatController {
  constructor() {}

  async chatRoomAdd(req, res) {
    const bodyData = req.body;
    const userId = req.user.id;
    const createdChatRoom = await chatService.createChatRoom(userId, bodyData);
    res.status(201).json(createdChatRoom);
  }
}

export default ChatController;
