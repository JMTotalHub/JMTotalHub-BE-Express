import request from 'supertest';
import app from '../../../app';

jest.mock()

describe('Board Controller', () => {
  it('should get all boards', async () => {
    const response = await request(app).get('/boards');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  it('should get a board by ID', async () => {
    const boardId = 1; // 테스트용 ID
    const response = await request(app).get(`/boards/${boardId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', boardId);
  });

  it('should create a new board', async () => {
    const newBoard = { name: 'New Board', description: 'New Description' };
    const response = await request(app).post('/boards').send(newBoard);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', newBoard.name);
  });

  it('should update a board', async () => {
    const boardId = 1; // 테스트용 ID
    const updatedData = { name: 'Updated Board', description: 'Updated Description' };
    const response = await request(app).put(`/boards/${boardId}`).send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', updatedData.name);
  });

  it('should delete a board', async () => {
    const boardId = 1; // 테스트용 ID
    const response = await request(app).delete(`/boards/${boardId}`);
    expect(response.status).toBe(204);
  });
});