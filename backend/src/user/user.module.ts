import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {UserDAO} from './user-dao';
import {DbadapterModule} from '../dbadapter-module/dbadapter.module';

@Module({
  controllers: [UserController],
  components: [
    UserService,
    UserDAO
  ],
  modules: [
    DbadapterModule
  ]
})
export class UserModule {}
