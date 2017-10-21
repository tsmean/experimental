import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import {PasswordCryptographerServiceImpl} from './password-cryptographer/password-cryptographer';
import {UserService} from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
        controllers: [UserController],
        components: [
          PasswordCryptographerServiceImpl,
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
