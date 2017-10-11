import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {AuthModule} from '../auth-module/auth.module';

@Module({
  controllers: [UserController],
  components: [UserService],
  modules: [AuthModule]
})
export class UserModule {}
