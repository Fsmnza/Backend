import supertest from 'supertest';
import express, { Router } from 'express'; 
import mongoose from 'mongoose';
import chatRouter from '../src/Chat/chat.router';

const app = express();
app.use('/api/chats', chatRouter);

const request = supertest(app);

describe('Chat API Tests', () => {
  let chatId = 1; 

  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://miko:MkFJDLaoSJBa2o3q@datingapp.z9ldvum.mongodb.net/?retryWrites=true&w=majority&appName=datingapp', {});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should get all chats', async () => {
    const response = await request.get('/api/chats').expect(200);
    expect(response.body).toBeDefined();
  });

  it('should create a new chat', async () => {
    const firstUser = 1;
    const secondUser = 2;

    const response = await request.post('/api/chats').send({ firstUser, secondUser }).expect(200);
    expect(response.body).toBeDefined();
    chatId = response.body.chatId;  
  });

  it('should get a specific chat by ID', async () => {
    const response = await request.get(`/api/chats/${chatId}`).expect(200);
    expect(response.body).toBeDefined();
  });

  it('should get messages for a specific chat by ID', async () => {
    const response = await request.get(`/api/chats/${chatId}/messages`).expect(200);
    expect(response.body).toBeDefined();
  });

  it('should create a new message for a specific chat by ID', async () => {
    const sender = 2;
    const text = 'Test';

    const response = await request
      .post(`/api/chats/${chatId}/messages`)
      .send({ sender, text })
      .expect(204);
  });
});
