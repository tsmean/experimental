import { Module } from '@nestjs/common';
import {PassportInit} from './passport';

@Module({
  components: [PassportInit],
})
export class AuthModule {}
