import {UserDAO} from './user-dao';
import {Test} from '@nestjs/testing';
import {User} from '../../../shared/models/user.model';
import {PasswordCryptographerService} from './password-cryptographer';
import {MongoConnector} from '../mongo-module/mongo-connector';
import {DbAdapter} from '../dbadapter-module/dbadapter';
import {MongoDAO} from '../mongo-module/mongo-dao';
describe('UserDAO', () => {

  let userDAO: UserDAO;

  beforeEach(async (done) => {
    const module = await Test.createTestingModule({
      components: [
        MongoDAO,
        UserDAO,
        DbAdapter,
        PasswordCryptographerService
      ],
    }).compile();

    userDAO = module.get<UserDAO>(UserDAO);

    const config = require('../../properties/test.properties.json');
    const connector = new MongoConnector();
    connector.connectToDatabase(config.db, (db) => {
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
