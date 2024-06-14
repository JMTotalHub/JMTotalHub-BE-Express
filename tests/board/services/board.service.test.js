import { PrismaClient } from '@prisma/client';
import * as boardService from '../../../domains/board/services/board.service';
import { NotFoundError } from '../../../common/error/custom-errors';

jest.mock('@prisma/client');
const prisma = new PrismaClient();

describe('Board Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find all boards', async () => {
    prisma.board.findMany.mockResolvedValue([]);
    const result = await boardService.findBoardList();
    expect(result).toEqual([]);
    expect(prisma.board.findMany).toHaveBeenCalledTimes(1);
  });

  it('should find a board by ID', async () => {
    const board = { id: 1, name: 'Test Board' };
    prisma.board.findUnique.mockResolvedValue(board);
    const result = await boardService.findBoard(1);
    expect(result).toEqual(board);
    expect(prisma.board.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw NotFoundError if board not found', async () => {
    prisma.board.findUnique.mockResolvedValue(null);
    await expect(boardService.findBoard(1)).rejects.toThrow(NotFoundError);
  });

  it('should create a new board', async () => {
    const newBoard = { id: 1, name: 'New Board', description: 'New Description' };
    prisma.board.create.mockResolvedValue(newBoard);
    const result = await boardService.createBoard({ name: 'New Board', description: 'New Description' });
    expect(result).toEqual(newBoard);
    expect(prisma.board.create).toHaveBeenCalledWith({ data: { name: 'New Board', description: 'New Description' } });
  });

  it('should update a board', async () => {
    const updatedBoard = { id: 1, name: 'Updated Board', description: 'Updated Description' };
    prisma.board.update.mockResolvedValue(updatedBoard);
    const result = await boardService.updateBoard(1, { name: 'Updated Board', description: 'Updated Description' });
    expect(result).toEqual(updatedBoard);
    expect(prisma.board.update).toHaveBeenCalledWith({ where: { id: 1 }, data: { name: 'Updated Board', description: 'Updated Description' } });
  });

  it('should delete a board', async () => {
    prisma.board.delete.mockResolvedValue({});
    const result = await boardService.deleteBoard(1);
    expect(result).toEqual({});
    expect(prisma.board.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
