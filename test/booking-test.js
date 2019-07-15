import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../backend/app';
import { API_VER } from '../backend/utils/constants';

chai.use(chaiHttp);
const { expect } = chai;
const API = `/${API_VER}`;

describe('Bookings Test', () => {
  let validToken;
  let userToken;
  let noBookingsToken;

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
    noBookingsToken = res2.body.data.token;

    const res3 = await chai.request(app)
      .post(`${API}/auth/signin`)
      .send({
        email: 'perrin@example.com',
        password: 'perrin@example.com',
      });
    userToken = res3.body.data.token;
  });

  const invalidToken = 'CI6MTU2Mjc5MTY1NX0.ZbgVp170doTTZiXrBWQQmHPaWdntX8yQ_mrsxMyh6xk';
  const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmRAZXhhbXBsZS5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NjI3NjAyNjksImV4cCI6MTU2Mjg0NjY2OX0.bxaNT_-1ZEKQBwTQcS99aggj4R8NTmg2GjSVesF_i8Q';
  const bookingAPI = `${API}/bookings`;

  describe('Booking POST /bookings', () => {
    it('should book a trip without seat number', async () => {
      const res = await chai.request(app)
        .post(bookingAPI)
        .send({
          token: validToken,
          trip_id: 1,
        });

      expect(res).to.have.status(201);
      const { status, data } = res.body;
      expect(status).to.equal('success');
      expect(data).to.be.a('object');
      expect(data).to.have.property('booking_id');
      expect(data).to.have.property('bus_id');
      expect(data).to.have.property('user_id');
      expect(data).to.have.property('trip_id');
      expect(data).to.have.property('trip_date');
      expect(data).to.have.property('seat_number');
      expect(data).to.have.property('first_name');
      expect(data).to.have.property('last_name');
      expect(data).to.have.property('email');
    });

    it('should book a trip with seat number', async () => {
      const res = await chai.request(app)
        .post(bookingAPI)
        .send({
          token: validToken,
          trip_id: 1,
          seat_number: 15,
        });

      expect(res).to.have.status(201);
      const { status, data } = res.body;
      expect(status).to.equal('success');
      expect(data).to.be.a('object');
      expect(data).to.have.property('booking_id');
      expect(data).to.have.property('bus_id');
      expect(data).to.have.property('user_id');
      expect(data).to.have.property('trip_id');
      expect(data).to.have.property('trip_date');
      expect(data).to.have.property('seat_number');
      expect(data).to.have.property('first_name');
      expect(data).to.have.property('last_name');
      expect(data).to.have.property('email');
    });

    it('should return bad input', async () => {
      const res = await chai.request(app)
        .post(bookingAPI)
        .send({
          token: validToken,
          seat_number: 15,
        });

      expect(res).to.have.status(400);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
    });

    it('should return invalid token', async () => {
      const res = await chai.request(app)
        .post(bookingAPI)
        .send({
          token: invalidToken,
          trip_id: 1,
        });

      expect(res).to.have.status(401);
      const { status, error } = res.body;
      expect(status).to.equal('error');
      expect(error).to.equal('Authentication Error: Invalid Token');
    });

    it('should return expired token', async () => {
      const res = await chai.request(app)
        .post(bookingAPI)
        .send({
          token: expiredToken,
          trip_id: 1,
        });

      expect(res).to.have.status(401);
      const { status, error } = res.body;
      expect(status).to.equal('error');
      expect(error).to.equal('Authentication Error: Token has expired');
    });

    it('should return trip does not exist', async () => {
      const res = await chai.request(app)
        .post(bookingAPI)
        .send({
          token: validToken,
          trip_id: 8,
        });

      expect(res).to.have.status(422);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
    });

    it('should book a seat does not exist', async () => {
      const res = await chai.request(app)
        .post(bookingAPI)
        .send({
          token: validToken,
          trip_id: 3,
          seat_number: 8,
        });

      expect(res).to.have.status(422);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
    });

    it('should not book a seat has already been booked', async () => {
      const res = await chai.request(app)
        .post(bookingAPI)
        .send({
          token: validToken,
          trip_id: 3,
          seat_number: 4,
        });

      expect(res).to.have.status(422);
      const { status, error } = res.body;
      expect(status).to.equal('error');
      expect(error).to.equal('The seat with number 4 has already been booked');
    });

    it('should not book a trip when all seats have been booked', async () => {
      const res = await chai.request(app)
        .post(bookingAPI)
        .send({
          token: validToken,
          trip_id: 3,
        });

      expect(res).to.have.status(422);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
    });
  });

  describe('Booking GET /bookings', () => {
    it('should return all bookings', async () => {
      const res = await chai.request(app)
        .get(bookingAPI)
        .send({
          token: validToken,
        });

      expect(res).to.have.status(200);
      const { status, data } = res.body;
      expect(status).to.equal('success');
      expect(data).to.be.an('array');
      expect(data).to.have.lengthOf.above(1);
    });

    it('should return only user bookings', async () => {
      const res = await chai.request(app)
        .get(bookingAPI)
        .send({
          token: userToken,
        });

      expect(res).to.have.status(200);
      const { status, data } = res.body;
      expect(status).to.equal('success');
      expect(data).to.be.an('array');
      expect(data).to.have.lengthOf.above(1);
    });

    it('should return no bookings', async () => {
      const res = await chai.request(app)
        .get(bookingAPI)
        .send({
          token: noBookingsToken,
        });

      expect(res).to.have.status(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.data).to.equal('No booking to show');
    });

    it('bad input', async () => {
      const res = await chai.request(app)
        .get(bookingAPI)
        .send({
          nun: validToken,
        });

      expect(res).to.have.status(400);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
    });

    it('invalid token', async () => {
      const res = await chai.request(app)
        .get(bookingAPI)
        .send({
          token: invalidToken,
        });

      expect(res).to.have.status(401);
      const { status, error } = res.body;
      expect(status).to.equal('error');
      expect(error).to.equal('Authentication Error: Invalid Token');
    });

    it('expired token', async () => {
      const res = await chai.request(app)
        .get(bookingAPI)
        .send({
          token: expiredToken,
        });

      expect(res).to.have.status(401);
      const { status, error } = res.body;
      expect(status).to.equal('error');
      expect(error).to.equal('Authentication Error: Token has expired');
    });
  });

  describe('Booking DELETE /bookings/:id', () => {
    it('should delete the specified booking', async () => {
      const res = await chai.request(app)
        .delete(`${bookingAPI}/10`)
        .send({
          token: userToken,
        });

      expect(res).to.have.status(200);
      expect(res.body.status).to.equal('success');
      expect(res.body).to.have.property('data');
    });

    it('should confirm that specified booking to be deleted does not exist', async () => {
      const res = await chai.request(app)
        .delete(`${bookingAPI}/20`)
        .send({
          token: userToken,
        });

      expect(res).to.have.status(404);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
    });

    it('should display no authorization to delete the specified booking', async () => {
      const res = await chai.request(app)
        .delete(`${bookingAPI}/9`)
        .send({
          token: noBookingsToken,
        });

      expect(res).to.have.status(403);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
    });

    it('bad input', async () => {
      const res = await chai.request(app)
        .delete(`${bookingAPI}/10`)
        .send({
          nun: validToken,
        });

      expect(res).to.have.status(400);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
    });

    it('invalid token', async () => {
      const res = await chai.request(app)
        .delete(`${bookingAPI}/10`)
        .send({
          token: invalidToken,
        });

      expect(res).to.have.status(401);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
    });

    it('expired token', async () => {
      const res = await chai.request(app)
        .delete(`${bookingAPI}/10`)
        .send({
          token: expiredToken,
        });

      expect(res).to.have.status(401);
      expect(res.body.status).to.equal('error');
      expect(res.body).to.have.property('error');
    });
  });
});
