import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import {router} from '../router';
import * as assert from 'assert';
import {database} from '../db';
import {User, userDAO} from '@tsmean/auth';

chai.use(chaiHttp);
const expect = chai.expect;

describe('LoginRouter', () => {

  database().setupTests.connectTestToDatabase();

  it('should be able to login', (done) => {

    const user: User = {
      email: 'hans'
    };

    const plaintextPassword = 'Hello World';

    userDAO.create(user, plaintextPassword, (dbResp) => {

      expect(dbResp.error).to.be.null;

      chai.request(router)
          .post(`/api/v1/login`)
          .send({
            email: user.email,
            password: plaintextPassword
          })
          .then((resp: any) => {
            expect(resp.body.data.uid).to.equal(dbResp.data.uid);
            done();
          }, (err) => {
            console.error(err);
            assert(false);
            done();
          })
          .catch((err) => {
            throw err;
          });

    });

  });

  it('shouldnt be able to login with wrong password', (done) => {

    const user: User = {
      email: 'hans'
    };

    const plaintextPassword = 'Hello World';

    userDAO.create(user, plaintextPassword, (dbResp) => {

      expect(dbResp.error).to.be.null;

      chai.request(router)
          .post('/api/v1/login')
          .send({
            email: user.email,
            password: 'some wrong password'
          })
          .catch((err) => {
            expect(err.response.res.statusCode).to.equal(401);
            done();
          });
    });

  });

});
