import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../backend/app';
import { API_VER } from '../backend/utils/constants';

chai.use(chaiHttp);
const { expect } = chai;
const API = `/${API_VER}/auth`;

describe('User POST /auth/signup', () => {
  const signUpApi = `${API}/signup`;

  const newUser = {
    email: 'komsic@gmail.com',
    password: 'ehfsdkfdjgjfg',
    first_name: 'Ade',
    last_name: 'Ola',
  };
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
