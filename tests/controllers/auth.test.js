import chai from 'chai';
import chaiHttp from 'chai-http';
import { config } from 'dotenv';

import app from '../../src/index';

config();

chai.use(chaiHttp);

chai.should();

const user = {
  name: 'Test Name',
  email: 'test@email.com',
  password: process.env.TEST_PASSWORD,
};

describe('Auth', () => {
  it('Should create new user', (done) => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send(user)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should not register a new user when email is not provided', (done) => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send({
        name: user.name,
        password: user.password,
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.should.be.a('Object');
        done();
      });
  });

  it('Should login an existing user with email', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: user.email, password: user.password })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should not login user when password is not provided', (done) => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send({ email: user.email })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.should.be.a('Object');
        done();
      });
  });
});
