import {Module, NestModule, RequestMethod} from '@nestjs/common';
import { UserController } from './user.controller';
import {PasswordCryptographerServiceImpl} from './password-cryptographer';
import {LocalStrategy} from './local.strategy';
import {MiddlewaresConsumer} from '@nestjs/common/interfaces/middlewares';
import * as passport from 'passport';
import {UserService} from './user.service';
import {userProviders} from './user.providers';
import {DatabaseModule} from '../database/database.module';
import {PasswordCryptographerService} from './password-cryptographer.interface';
import {PASSWORD_CRYPTOGRAPHER_TOKEN} from './constants';

@Module({
  controllers: [UserController],
  components: [
    ...userProviders,
    {
      provide: PASSWORD_CRYPTOGRAPHER_TOKEN,
      useClass: PasswordCryptographerServiceImpl
    },
    UserService,
    LocalStrategy
  ],
  modules: [DatabaseModule]
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
