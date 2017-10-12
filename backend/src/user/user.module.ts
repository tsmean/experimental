import {Module, NestModule, RequestMethod} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {UserDAO} from './user-dao';
import {DbadapterModule} from '../dbadapter-module/dbadapter.module';
import {PasswordCryptographerService} from './password-cryptographer';
import {LocalStrategy} from './local.strategy';
import {MiddlewaresConsumer} from '@nestjs/common/interfaces/middlewares';
import * as passport from 'passport';

@Module({
  controllers: [UserController],
  components: [
    UserService,
    UserDAO,
    PasswordCryptographerService,
    LocalStrategy
  ],
  modules: [
    DbadapterModule
  ]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('local', { session: false }))
      .forRoutes({ path: '/private', method: RequestMethod.ALL });
  }
}

// components: [
//   PassportInit,
//   PasswordCryptographerService
// ],
//   exports: [
//   PasswordCryptographerService,
//   DAO
// ],
//   modules: [
//   DbadapterModule
// ]
