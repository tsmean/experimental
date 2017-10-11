import { Module } from '@nestjs/common';
import {WelcomeHtmlRouter} from './endpoints/welcome-html-router';

@Module({
  components: [],
  controllers: [WelcomeHtmlRouter]
})
export class RouterModule {}
