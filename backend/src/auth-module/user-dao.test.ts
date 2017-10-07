import * as mocha from 'mocha';
import * as chai from 'chai';
import {userDAO} from './user-dao';
import {User} from './user.model';
import {database} from './db';
const expect = chai.expect;

describe('UserDAO', () => {

  database().setupTests.connectTestToDatabase();

  it('should be able to create user (only once)', function(done) {

    const user: User = {
      email: 'hans'
    };

    userDAO.create(user, '1234', (dbResponse) => {
      expect(dbResponse.error).to.be.null;
      expect(dbResponse.data.uid).to.exist;

      userDAO.create(user, '1234', (innerDbResponse) => {
        expect(innerDbResponse.error).to.exist;
        expect(innerDbResponse.error.message).to.equal('User already exists');
        done();
      });

    });

  });

});
