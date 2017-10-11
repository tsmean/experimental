import {setupTests} from '../mongo-module/testsetup';
import {UserDAO} from './user-dao';
import {Test} from '@nestjs/testing';
import {User} from '../../../shared/models/user.model';
import {DAO} from '../dbadapter-module';
import {PasswordCryptographerService} from '../auth-module/password-cryptographer';
import {database} from '../mongo-module/database';
describe('UserDAO', () => {

  let userDAO: UserDAO;

  beforeEach(async (done) => {
    const module = await Test.createTestingModule({
      components: [
        UserDAO,
        DAO,
        PasswordCryptographerService
      ],
    }).compile();

    userDAO = module.get<UserDAO>(UserDAO);

    const config = require('../../properties/test.properties.json');
    console.log(config);
    database.connectToDatabase(config.db, (db) => {
      db.dropDatabase().then(() => {
        done();
      });
    });

  });

  it('should be able to create user (only once)', function(done) {

    const user: User = {
      email: 'hans'
    };

    userDAO.create(user, '1234', (dbResponse) => {
      expect(dbResponse.error).toBe(null);
      expect(dbResponse.data.uid).not.toBe(undefined);

      userDAO.create(user, '1234', (innerDbResponse) => {
        expect(innerDbResponse.error).not.toBe(null);
        expect(innerDbResponse.error.message).toEqual('User already exists');
        done();
      });

    });

  });

});
