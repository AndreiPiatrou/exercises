const request = require('supertest');
const assert = require('assert');
const app = require('../index');

describe('server', () => {

    describe('/ping', () => {
        it('should send back a JSON object with ok message', async () => {
            const res = await request(app).get('/ping').expect(200);

            assert.deepEqual(res.body, { message: 'ok' });
        });
    });
});
