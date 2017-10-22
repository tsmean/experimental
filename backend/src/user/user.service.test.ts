import {Test} from '@nestjs/testing';
import {UserService} from './user.service';
import {userProviders} from './user.providers';
import {databaseProviders} from '../database/database.providers';
import {IUser} from '../../../shared/src/models/user.model';
import {SchemaDropCommand} from 'typeorm/commands/SchemaDropCommand';

describe('user service', () => {

  let userService: UserService;

  /**
   * Can't be beforeEach here, or else you'll get error since JEST runs in parallel:
   * Cannot create a new connection named "default",
   * because connection with such name already exist and it now has an active connection session.
   */
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      components: [
        ...databaseProviders,
        ...userProviders,
        UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be able to create a user', (done) => {

    // TODO: find out how to drop table in typeorm...
    const email = Math.random() + '@gmail.com';
    const user: IUser = {
      email: email,
      firstName: 'Gertrud',
      lastName: 'Müller'
    };

    userService.create(user, 'mySuperSecurePasswordIXJAJA').then(resp => {
      if (resp.id !== undefined) {
        done();
      }
    });

  });


  it('should be able to find all users', (done) => {
    userService.findAll().then(resp => {
      console.log(resp);
      expect(Array.isArray(resp)).toBe(true);
      done();
    });
  });

});
