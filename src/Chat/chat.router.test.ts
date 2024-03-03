import * as request from 'supertest';
import * as express from 'express';
import chatRouter from './chat.router.ts';

const app = express();
app.use(express.json());
app.use('/chat', chatRouter);

describe('Chat Router Endpoints', () => {
  // Mocking authMiddleware
  const mockAuthMiddleware = (req: any, res: any, next: any) => {
    req.app.locals.userId = 'mockedUserId';
    next();
  };

  beforeAll(() => {
    // Replace authMiddleware in the router with the mock
    (chatRouter as any).stack[1].route.stack[0].handle = mockAuthMiddleware;
  });

  afterAll(() => {
    // Clean up mocks or restore original middleware
  });

  it('GET /chat/ should return all chats', async () => {
    const response = await request(app).get('/chat/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('chats');
  });

  it('POST /chat/ should create a new chat', async () => {
    const response = await request(app).post('/chat/').send({ user: 'someUserId' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('chatId');
  });

  it('GET /chat/:id/ should return a specific chat', async () => {
    const response = await request(app).get('/chat/someChatId/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('someExpectedProperty');
  });

  it('GET /chat/:id/messages/ should return messages of a specific chat', async () => {
    const response = await request(app).get('/chat/someChatId/messages/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('messages');
  });

  it('POST /chat/:id/messages/ should create a new message in a specific chat', async () => {
    const response = await request(app).post('/chat/someChatId/messages/').send({ text: 'Hello!' });
    expect(response.status).toBe(204);
  });
});
