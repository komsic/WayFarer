import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../backend/app';
import { API_VER } from '../backend/utils/constants';

chai.use(chaiHttp);
const { expect } = chai;
const API = `/${API_VER}`;

describe('Trips Test', () => {
  let validToken;
  let unAuthorizedToken;
  let now;

  beforeEach(() => {
    now = new Date();
  });

  before(async () => {
    const res1 = await chai.request(app)
      .post(`${API}/auth/signin`)
      .send({
        email: 'rand@example.com',
        password: 'rand@example.com',
      });
    validToken = res1.body.data.token;

    const res2 = await chai.request(app)
      .post(`${API}/auth/signin`)
      .send({
        email: 'koms@gmail.com',
        password: 'koms@gmail.com',
      });
    unAuthorizedToken = res2.body.data.token;
  });

  const invalidToken = 'CI6MTU2Mjc5MTY1NX0.ZbgVp170doTTZiXrBWQQmHPaWdntX8yQ_mrsxMyh6xk';
  const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmRAZXhhbXBsZS5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NjI3NjAyNjksImV4cCI6MTU2Mjg0NjY2OX0.bxaNT_-1ZEKQBwTQcS99aggj4R8NTmg2GjSVesF_i8Q';
  const tripAPI = `${API}/trips`;

  describe('Trip POST /trips', () => {
    it('should create new trip', async () => {
      const res = await chai.request(app)
        .post(tripAPI)
        .send({
          token: validToken,
          bus_id: 1,
          origin: 'Knowhere',
          destination: 'Asgard',
          trip_date: new Date(now.setDate(now.getDate() + 6)),
          fare: 250000,
        });

      expect(res).to.have.status(201);
      const { status, data } = res.body;
      expect(status).to.equal('success');
      expect(data).to.be.a('object');
      expect(data).to.have.property('trip_id');
      expect(data).to.have.property('bus_id');
      expect(data).to.have.property('origin');
      expect(data).to.have.property('destination');
      expect(data).to.have.property('trip_date');
      expect(data).to.have.property('fare');
      expect(data).to.have.property('capacity');
    });

    it('should return invalid token', async () => {
      const res = await chai.request(app)
        .post(tripAPI)
        .send({
          token: invalidToken,
          bus_id: 1,
          origin: 'Knowhere',
          destination: 'Asgard',
          trip_date: new Date(now.setDate(now.getDate() + 6)),
          fare: 250000,
        });

      expect(res).to.have.status(401);
      const { status, error } = res.body;
      expect(status).to.equal('error');
      expect(error).to.equal('Authentication Error: Invalid Token');
    });

    it('should return expired token', async () => {
      const res = await chai.request(app)
        .post(tripAPI)
        .send({
          token: expiredToken,
          bus_id: 1,
          origin: 'Knowhere',
          destination: 'Asgard',
          trip_date: new Date(now.setDate(now.getDate() + 6)),
          fare: 250000,
        });

      expect(res).to.have.status(401);
      const { status, error } = res.body;
      expect(status).to.equal('error');
      expect(error).to.equal('Authentication Error: Token has expired');
    });

    it('should return unauthorized permission', async () => {
      const res = await chai.request(app)
        .post(tripAPI)
        .send({
          token: unAuthorizedToken,
          bus_id: 1,
          origin: 'Knowhere',
          destination: 'Asgard',
          trip_date: new Date(now.setDate(now.getDate() + 6)),
          fare: 250000,
        });

      expect(res).to.have.status(403);
      const { status, error } = res.body;
      expect(status).to.equal('error');
      expect(error).to.equal('Authorization Failed: You do not have permission to perform this operation');
    });

    it('should return bad request', async () => {
      const res = await chai.request(app)
        .post(tripAPI)
        .send({
          token: validToken,
          bus_id: 1,
          destination: 'Asgard',
          trip_date: new Date(now.setDate(now.getDate() + 6)),
          fare: 250000,
        });

      expect(res).to.have.status(400);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
    });

    it('should return trip_date conflict', async () => {
      const res = await chai.request(app)
        .post(tripAPI)
        .send({
          token: validToken,
          bus_id: 1,
          origin: 'Knowhere',
          destination: 'Asgard',
          trip_date: new Date(now.setDate(now.getDate() - 6)),
          fare: 250000,
        });

      expect(res).to.have.status(422);
      const { status, error } = res.body;
      expect(status).to.equal('error');
      expect(error).to.equal('new row for relation "trips" violates check constraint "trips_check"');
    });
  });
});
