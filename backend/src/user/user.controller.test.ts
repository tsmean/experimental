import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import {PasswordCryptographerServiceImpl} from './password-cryptographer/password-cryptographer';
import {UserService} from './user.service';
import {User} from './user.entity';
import {databaseProviders} from '../database/database.providers';
import {userProviders} from './user.providers';
import {EmailValidatorImpl} from '../validation/email/email-validator.component';
import {Log} from '../logger/logger';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
        controllers: [UserController],
        components: [
          EmailValidatorImpl,
          Log,
          PasswordCryptographerServiceImpl,
          ...databaseProviders,
          ...userProviders,
          UserService
        ],
      }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  it('should be able to find users', async () => {
    const users: User[] = [exampleUser(1), exampleUser(2)];
    jest.spyOn(userService, 'find').mockImplementation(() => users);
    expect(await userController.find()).toBe(users);
  });

  it('should be able to find one user by id', async (done) => {
    const user = exampleUser(1);
    jest.spyOn(userService, 'findOneById').mockImplementation(() => user);
    expect(await userController.findOne(1)).toBe(user);
    done();
  });

  it('should be able to find one user by email', async (done) => {
    const user = exampleUser(1);
    jest.spyOn(userService, 'findOneByEmail').mockImplementation(() => user);
    const returnedUser = await userController.findOne('hans@wurst.de');
    expect(returnedUser).toBe(user);
    done();
  });

  it('should be able to update one user', async (done) => {
    const user = exampleUser(1);
    jest.spyOn(userService, 'update').mockImplementation(() => undefined);
    const returnVal = await userController.fullUpdate(user);
    expect(returnVal).toBeUndefined();
    done();
  });

  it('should be able to partial update one user', async (done) => {
    const user = exampleUser(1);
    jest.spyOn(userService, 'update').mockImplementation(() => undefined);
    const returnVal = await userController.partialUpdate(user.id, user);
    expect(returnVal).toBeUndefined();
    done();
  });

  it('should be able to remove one user', async (done) => {
    const user = exampleUser(1);
    jest.spyOn(userService, 'remove').mockImplementation(() => undefined);
    const returnVal = await userController.remove(user.id);
    expect(returnVal).toBeUndefined();
    done();
  });

  function exampleUser(id: number): User {
    return {
      id: id,
      email: `hans${1}@wurst.de`,
      firstName: 'Hans',
      lastName: 'Wurst',
      password: {
        hash: 'jkskljsljkjskljksl',
        algorithm: 'bcrypt',
        id: id
      }
    };
  }

});
