import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../backend/app';
import { API_VER } from '../backend/utils/constants';

chai.use(chaiHttp);
const { expect } = chai;
const API = `/${API_VER}/auth`;

const newUser = {
  email: 'komsic@gmail.com',
  password: 'ehfsdkfdjgjfg',
  first_name: 'Ade',
  last_name: 'Ola',
};

describe('User POST /auth/signup', () => {
  const signUpApi = `${API}/signup`;

  it('should create a new user with 201 status code', async () => {
    const res = await chai.request(app)
      .post(signUpApi)
      .send(newUser);

    expect(res).to.have.status(201);
    const { status, data } = res.body;
    expect(status).to.equal('success');
    expect(data).to.be.a('object');
    expect(data).to.have.property('is_admin');
    expect(data).to.have.property('user_id');
    expect(data).to.have.property('token');
  });

  const userWithMissingParameter = {
    email: 'komsic@gmail.com',
    first_name: 'Ade',
    last_name: 'Ola',
  };
  it('should have a missing parameter error', async () => {
    const res = await chai.request(app)
      .post(signUpApi)
      .send(userWithMissingParameter);

    expect(res).to.have.status(400);
    const { status, error } = res.body;
    expect(status).to.equal('error');
    expect(error[0]).to.equal('"password" is required');
  });

  const userWithInvalidEmail = {
    email: 'komsic@gmail.c',
    password: 'ehfsdkfdjgjfg',
    first_name: 'Ade',
    last_name: 'Ola',
  };
  it('should have invalid email error', async () => {
    const res = await chai.request(app)
      .post(signUpApi)
      .send(userWithInvalidEmail);

    expect(res).to.have.status(400);
    const { status, error } = res.body;
    expect(status).to.equal('error');
    expect(error[0]).to.equal('"email" must be a valid email');
  });


  const userWithMinPassword = {
    email: 'komsic@gmail.com',
    password: 'fdf',
    first_name: 'Ade',
    last_name: 'Ola',
  };
  it('should have minimum password length error', async () => {
    const res = await chai.request(app)
      .post(signUpApi)
      .send(userWithMinPassword);

    expect(res).to.have.status(400);
    const { status, error } = res.body;
    expect(status).to.equal('error');
    expect(error[0]).to.equal('"password" length must be at least 8 characters long');
  });

  const userWithAlreadyExistingEmail = {
    email: 'komsic@gmail.com',
    password: 'ehfsdkfdjgjfg',
    first_name: 'Ade',
    last_name: 'Ola',
  };
  it('should have constraint error', async () => {
    const res = await chai.request(app)
      .post(signUpApi)
      .send(userWithAlreadyExistingEmail);

    // Key (email)=(komsic@gmail.com) already exists.
    expect(res).to.have.status(422);
    const { status, error } = res.body;
    expect(status).to.equal('error');
    expect(error).to.equal('Key (email)=(komsic@gmail.com) already exists.');
  });
});

describe('User POST /auth/signin', () => {
  const signInApi = `${API}/signin`;

  it('should login successfully', async () => {
    const res = await chai.request(app)
      .post(signInApi)
      .send({
        email: newUser.email,
        password: newUser.password,
      });

    expect(res).to.have.status(200);
    const { status, data } = res.body;
    expect(status).to.equal('success');
    expect(data).to.be.a('object');
    expect(data).to.have.property('is_admin');
    expect(data).to.have.property('user_id');
    expect(data).to.have.property('token');
  });

  it('should throw email mismatched error', async () => {
    const res = await chai.request(app)
      .post(signInApi)
      .send({
        email: 'lodf@dsdff.com',
        password: newUser.password,
      });

    expect(res).to.have.status(422);
    const { status, error } = res.body;
    expect(status).to.equal('error');
    expect(error).to.equal('Email does not exist');
  });

  it('should throw password incorrect error', async () => {
    const res = await chai.request(app)
      .post(signInApi)
      .send({
        email: newUser.email,
        password: 'sdadfsferfffffffffff',
      });

    expect(res).to.have.status(401);
    const { status, error } = res.body;
    expect(status).to.equal('error');
    expect(error).to.equal('Authentication Failed: Password is not correct');
  });

  it('should throw bad input error', async () => {
    const res = await chai.request(app)
      .post(signInApi)
      .send({
        email: newUser.email,
        last_name: 'Kolapo',
      });

    expect(res).to.have.status(400);
    const { status } = res.body;
    expect(status).to.equal('error');
    expect(res.body).have.property('error');
  });
});
