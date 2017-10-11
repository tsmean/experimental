import { Module } from '@nestjs/common';
import {WelcomeHtmlController} from './endpoints/welcome-html-router';
import {UserController} from './endpoints/user-router';

@Module({
  components: [],
  controllers: [
    WelcomeHtmlController,
    UserController
  ]
})
export class RouterModule {}
