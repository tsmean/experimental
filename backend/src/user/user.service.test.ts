import {Test} from '@nestjs/testing';
import {UserService} from './user.service';
import {userProviders} from './user.providers';
import {databaseProviders} from '../database/database.providers';
import {IUser} from '../../../shared/src/models/user.model';

describe('user service', () => {

  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      components: [
        ...databaseProviders,
        ...userProviders,
        UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be able to create a user', (done) => {

    const user: IUser = {
      email: 'bla',
      firstName: 'blub',
      lastName: 'blarb'
    };

    userService.create(user, 'hahaha').then(resp => {
      console.log('done', resp);
      done();
    });

  });

  // it('should be find all users', (done) => {
  //
  //   userService.findAll().then(resp => {
  //     console.log('done', resp);
  //     done();
  //   });
  //
  // });

});
