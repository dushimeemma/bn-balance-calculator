import chai from 'chai';
import chaiHttp from 'chai-http';
import { config } from 'dotenv';

import app from '../../src/index';

config();

chai.use(chaiHttp);

chai.should();

const user = {
  email: 'test@email.com',
  password: process.env.TEST_PASSWORD,
};

let token;
let id;

describe('Balance', () => {
  before(async () => {
    const res = await chai.request(app).post('/api/auth/login').send(user);
    token = res.body.token;
  });
  it('Should create new balance', (done) => {
    chai
      .request(app)
      .post('/api/balance')
      .set({ 'x-auth-token': token })
      .send({
        amount: 45000,
        amount_per_day: 3000,
      })
      .end((err, res) => {
        if (err) done(err);

        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it("Should get all user's balance", (done) => {
    chai
      .request(app)
      .get('/api/balance')
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        id = res.body.balances[0].id;
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should update balance', (done) => {
    chai
      .request(app)
      .put(`/api/balance/${id}`)
      .set({ 'x-auth-token': token })
      .send({
        amount_per_day: 3000,
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should update balance used', (done) => {
    chai
      .request(app)
      .post(`/api/balance/decrease/${id}`)
      .set({ 'x-auth-token': token })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
});
