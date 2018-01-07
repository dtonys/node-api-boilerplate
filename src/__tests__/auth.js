import cookie from 'cookie';
import superagent from 'superagent';
import {
  setupTestEnvironment,
  teardownTestEnvironment,
} from './helpers/utils';


describe('Auth API tests', () => {

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

  describe('POST `/api/signup`', () => {
    test('Creates a new user', async () => {
      const testUser = {
        email: 'testUser_1@test.test',
        password: '12345678',
      };
      const signupResponse = await superagent
        .post(`${baseUrl}/api/signup`)
        .send(testUser);
      expect(signupResponse.body.data.email).toBe(testUser.email);
    });

    test('Returns 422 error if email already exists', async () => {
      const testUser = {
        email: 'testUser_1@test.test',
        password: '12345678',
      };
      const signupResponse = await superagent
        .post(`${baseUrl}/api/signup`)
        .ok((response) => Boolean(response && response.text) )
        .send(testUser);

      expect(signupResponse.statusCode).toBe(422);
    });
  });

  describe('POST `/api/login`', () => {
    test('Logs the user in', async () => {
      const testUser = {
        email: 'testUser_2@test.test',
        password: '12345678',
      };
      await superagent
        .post(`${baseUrl}/api/signup`)
        .send(testUser);
      const loginResponse = await superagent
        .post(`${baseUrl}/api/login`)
        .send(testUser);

      expect(loginResponse.statusCode).toBe(200);
      expect(loginResponse.headers['set-cookie'][0]).toContain('Session=');
    });

    test('Returns 404 if the user is not found', async () => {
      const notFoundUser = {
        email: 'abcdef777@test.test',
        password: '12345678',
      };
      const loginResponse = await superagent
        .post(`${baseUrl}/api/login`)
        .ok((response) => Boolean(response && response.text) )
        .send(notFoundUser);

      expect(loginResponse.statusCode).toBe(404);
    });

    test('Returns 422 if the password is wrong', async () => {
      const wrongCredentials = {
        email: 'testUser_2@test.test',
        password: 'wrong',
      };
      const loginResponse = await superagent
        .post(`${baseUrl}/api/login`)
        .ok((response) => Boolean(response && response.text) )
        .send(wrongCredentials);

      expect(loginResponse.statusCode).toBe(422);
    });
  });

  test('TODO `/api/logout` logs a user out', async () => {
    const testUser = {
      email: 'testUser_3@test.test',
      password: '12345678',
    };

    const signupResponse = await superagent
      .post(`${baseUrl}/api/signup`)
      .send(testUser);
    const [ , sessionToken ] = /Session=([^;]+)/.exec(signupResponse.headers['set-cookie'][0]);
    const logoutResponse = await superagent
      .get(`${baseUrl}/api/logout`)
      .set({ Cookie: `Session=${sessionToken}` });

    const cookieObj = cookie.parse(logoutResponse.headers['set-cookie'][0]);
    // check to see the session cookie is cleared
    expect(cookieObj['Session']).toBeDefined();
    const expireDate = new Date(cookieObj.Expires).getTime();
    const now = (new Date()).getTime();
    expect(expireDate).toBeLessThan(now);
  });

  test('TODO `/api/session` gets the logged in user\'s data`', async () => {
    const testUser = {
      email: 'testUser_4@test.test',
      password: '12345678',
    };
    const signupResponse = await superagent
      .post(`${baseUrl}/api/signup`)
      .send(testUser);

    const [ , sessionToken ] = /Session=([^;]+)/.exec(signupResponse.headers['set-cookie'][0]);
    const sessionResponse = await superagent
      .get(`${baseUrl}/api/session`)
      .set({ Cookie: `Session=${sessionToken}` });

    expect(sessionResponse.body.data.currentUser).toBeTruthy();
    expect(true).toBe(true);
  });

  describe('GET `/api/admin/users`', () => {
    test('Should succeed for an admin user', async () => {
      const adminUser = {
        email: 'admin@test.test',
        password: '12345678',
      };
      // Create user
      const createResponse = await superagent
        .post(`${baseUrl}/api/signup`)
        .send(adminUser);

      const updates = {
        roles: [ 'admin' ],
      };
      // Update user to admin
      await superagent
        .patch(`${baseUrl}/api/users/${createResponse.body.data._id}`)
        .send(updates);

      // Log user in to get an admin token
      const loginResponse = await superagent
        .post(`${baseUrl}/api/login`)
        .send(adminUser);

      // Hit API with admin token
      const [ , sessionToken ] = /Session=([^;]+)/.exec(loginResponse.headers['set-cookie'][0]);
      const getListResponse = await superagent
        .get(`${baseUrl}/api/admin/users`)
        .set({ Cookie: `Session=${sessionToken}` });
      expect(getListResponse.statusCode).toBe(200);
    });

    test('Should fail for a non-admin user', async () => {
      const nonAdminUser = {
        email: 'testUser_5@test.test',
        password: '12345678',
      };
      const signupResponse = await superagent
        .post(`${baseUrl}/api/signup`)
        .send(nonAdminUser);
      const [ , sessionToken ] = /Session=([^;]+)/.exec(signupResponse.headers['set-cookie'][0]);
      const getListResponse = await superagent
        .get(`${baseUrl}/api/admin/users`)
        .ok((response) => Boolean(response && response.text) )
        .set({ Cookie: `Session=${sessionToken}` });
      expect(getListResponse.statusCode).toBe(401);
    });
  });

  describe('GET `/api/member/users`', () => {
    test('Should succeed for a logged in user', async () => {
      const testUser = {
        email: 'testUser_6@test.test',
        password: '12345678',
      };
      const signupResponse = await superagent
        .post(`${baseUrl}/api/signup`)
        .send(testUser);
      const [ , sessionToken ] = /Session=([^;]+)/.exec(signupResponse.headers['set-cookie'][0]);
      const getListResponse = await superagent
        .get(`${baseUrl}/api/member/users`)
        .set({ Cookie: `Session=${sessionToken}` });
      expect(getListResponse.statusCode).toBe(200);
    });

    test('Should fail for a non-logged in user', async () => {
      const getListResponse = await superagent
        .get(`${baseUrl}/api/member/users`)
        .ok((response) => Boolean(response && response.text) );
      expect(getListResponse.statusCode).toBe(401);
    });
  });

});
