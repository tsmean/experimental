import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {AuthModule} from '../auth-module/auth.module';
import {UserDAO} from './user-dao';
import {DbadapterModule} from '../dbadapter-module/dbadapter.module';

@Module({
  controllers: [UserController],
  components: [
    UserService,
    UserDAO
  ],
  modules: [
    AuthModule,
    DbadapterModule
  ]
})
export class UserModule {}
