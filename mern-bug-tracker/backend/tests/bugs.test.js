const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');
const Bug = require('../models/Bug');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Bug.deleteMany({});
});

describe('Bug API', () => {
  const testBug = {
    title: 'Test Bug',
    description: 'This is a test bug',
    status: 'open',
    priority: 'medium'
  };

  test('GET /api/bugs should return empty array initially', async () => {
    const response = await request(app).get('/api/bugs');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /api/bugs should create a new bug', async () => {
    const response = await request(app)
      .post('/api/bugs')
      .send(testBug);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe(testBug.title);
    expect(response.body.description).toBe(testBug.description);
  });

  test('POST /api/bugs should validate required fields', async () => {
    const response = await request(app)
      .post('/api/bugs')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(2);
  });

  test('GET /api/bugs/:id should return a specific bug', async () => {
    const bug = await Bug.create(testBug);
    const response = await request(app).get(`/api/bugs/${bug._id}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(bug._id.toString());
  });

  test('PATCH /api/bugs/:id should update a bug', async () => {
    const bug = await Bug.create(testBug);
    const update = { status: 'in-progress' };
    
    const response = await request(app)
      .patch(`/api/bugs/${bug._id}`)
      .send(update);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(update.status);
  });

  test('DELETE /api/bugs/:id should delete a bug', async () => {
    const bug = await Bug.create(testBug);
    const response = await request(app).delete(`/api/bugs/${bug._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Bug deleted successfully');

    const deletedBug = await Bug.findById(bug._id);
    expect(deletedBug).toBeNull();
  });
}); 