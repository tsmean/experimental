import { Module } from '@nestjs/common';
import {AuthModule} from './auth-module/auth.module';
import {MongoModule} from './mongo-module/mongo.module';
import {DbadapterModule} from './dbadapter-module/dbadapter.module';
import {UserModule} from './user/user.module';
import {WelcomeModule} from './welcome/welcome.module';

@Module({
  modules: [
    UserModule,
    AuthModule,
    MongoModule,
    DbadapterModule,
    WelcomeModule

  ]
})
export class AppModule {}
