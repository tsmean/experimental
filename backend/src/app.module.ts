import { Module } from '@nestjs/common';
import {UserModule} from './user/user.module';
import {WelcomeModule} from './welcome/welcome.module';

@Module({
  modules: [
    UserModule,
    WelcomeModule
  ]
})
export class AppModule {}
