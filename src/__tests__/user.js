import superagent from 'superagent';
import {
  setupTestEnvironment,
  teardownTestEnvironment,
} from './helpers/utils';


describe('User API tests', () => {

  let baseUrl = null;
  beforeAll(async (done) => {
    const port = await setupTestEnvironment();
    baseUrl = `http://localhost:${port}`;
    done();
  });

  // Drop temp test database
  afterAll(async (done) => {
    await teardownTestEnvironment();
    done();
  });

  test('POST `/api/users` creates a new user', async () => {
    const testUser = {
      email: 'testUser@test.test',
      password_hash: '12345678',
    };
    const response = await superagent
      .post(`${baseUrl}/api/users`)
      .send(testUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.data ).toMatchObject(testUser);
  });

  test('PATCH `/api/users/:id` updates a user', async () => {
    const testUser = {
      email: 'testUser@test.test',
      password_hash: '12345678',
    };
    const createResponse = await superagent
      .post(`${baseUrl}/api/users`)
      .send(testUser);

    const updates = {
      email: 'testUser222@test.test',
    };
    const patchResponse = await superagent
      .patch(`${baseUrl}/api/users/${createResponse.body.data._id}`)
      .send(updates);

    expect(patchResponse.body.data ).toMatchObject(updates);
  });

  test('GET `/api/users/:id` gets a user', async () => {
    const testUser = {
      email: 'testUser@test.test',
      password_hash: '12345678',
    };
    const createResponse = await superagent
      .post(`${baseUrl}/api/users`)
      .send(testUser);

    const getResponse = await superagent
      .get(`${baseUrl}/api/users/${createResponse.body.data._id}`);

    expect(getResponse.body.data ).toMatchObject(testUser);
  });

  test('GET `/api/users` gets a list of users', async () => {
    const testUser1 = {
      email: 'testUser1@test.test',
      password_hash: '12345678',
    };
    const testUser2 = {
      email: 'testUser2@test.test',
      password_hash: '12345678',
    };
    await superagent
      .post(`${baseUrl}/api/users`)
      .send(testUser1);
    await superagent
      .post(`${baseUrl}/api/users`)
      .send(testUser2);
    const getListResponse = await superagent
      .get(`${baseUrl}/api/users`);
    expect(getListResponse.body.data.items.length >= 2).toBe(true);
    expect(getListResponse.body.data.items[0].email).toBeTruthy();
    expect(getListResponse.body.data.items[0].password_hash).toBeTruthy();
  });

  test('DELETE `/api/users/:id` deletes a user', async () => {
    const testUser = {
      email: 'testUser@test.test',
      password_hash: '12345678',
    };
    const createResponse = await superagent
      .post(`${baseUrl}/api/users`)
      .send(testUser);
    const deleteResponse = await superagent
      .delete(`${baseUrl}/api/users/${createResponse.body.data._id}`);

    expect(deleteResponse.body.data).toMatchObject(testUser);
  });

});
