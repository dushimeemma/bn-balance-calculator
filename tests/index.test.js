import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../src/index';

chai.use(chaiHttp);
chai.should();

describe('App', () => {
  it('Should run without error', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.should.be.a('Object');
        done();
      });
  });
  it('Should return Not Found With a non exists Endpoint', (done) => {
    chai
      .request(app)
      .get('/app')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        res.should.be.a('Object');
        done();
      });
  });
});
