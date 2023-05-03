const request = require('supertest');
const app = require('../server.js');

// const request = require('supertest');

describe('GET /getdata', () => {
    let server;

    beforeAll(() => {
        server = app.listen(3000);
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should return the data from the API', async () => {
        // ...
    });

    it('should handle errors from the API', async () => {
        // ...
    });
});

// describe('GET /getdata', () => {
//     it('should return the data from the API', async () => {
//         const response = await request(app).get('/getdata');
//
//         expect(response.status).toEqual(200);
//         expect(response.body).toEqual({ id: 1, name: 'John Doe' });
//     });
//
//     it('should handle errors from the API', async () => {
//         // Configure your mock API to return an error
//
//         const response = await request(app).get('/getdata');
//
//         expect(response.status).toEqual(500);
//         expect(response.body).toEqual({ error: 'Internal server error' });
//     });
// });

