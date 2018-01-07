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

  test('TODO', async () => {
    expect(true).toBe(true);
  });

});
