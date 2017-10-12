import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service.deprecated';
import {UserDAO} from './user-dao';
import {PasswordCryptographerService} from './password-cryptographer';
import {DbAdapter} from '../dbadapter-module/dbadapter';
import {MongoDAO} from '../mongo-module/mongo-dao';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
        controllers: [UserController],
        components: [
          MongoDAO,
          DbAdapter,
          PasswordCryptographerService,
          UserDAO,
          UserService
        ],
      }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  it('should return an array of users', async () => {
    const result = ['test'];
    jest.spyOn(userService, 'findAll').mockImplementation(() => result);
    expect(await userController.findAll()).toBe(result);
  });

});
