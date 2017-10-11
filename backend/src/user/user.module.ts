import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {AuthModule} from '../auth-module/auth.module';
import {UserDAO} from './user-dao';

@Module({
  controllers: [UserController],
  components: [
    UserService,
    UserDAO
  ],
  modules: [AuthModule]
})
export class UserModule {}
