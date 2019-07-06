import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../backend/app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test GET / Status Codes', () => {
  it('should have a 200 status code', async () => {
    const res = await chai.request(app).get('/');

    expect(res).to.have.status(200);
  });

  it('should have a 404 status code', async () => {
    const res = await chai.request(app).get('/kssddn');

    expect(res).to.have.status(404);
  });
});

describe('Test GET / Versioning', () => {
  it('should have a 200 status code', async () => {
    const res = await chai.request(app).get('/api');

    expect(res).to.have.status(200);
  });

  it('should have a 404 status code', async () => {
    const res = await chai.request(app).get('/api/v1');

    expect(res).to.have.status(200);
  });
});
