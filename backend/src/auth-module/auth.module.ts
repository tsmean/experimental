import { Module } from '@nestjs/common';
import {PassportInit} from './passport';
import {PasswordCryptographerService} from './password-cryptographer';
import {DbadapterModule} from '../dbadapter-module/dbadapter.module';

@Module({
  components: [
    PassportInit,
    PasswordCryptographerService
  ],
  exports: [
    PasswordCryptographerService
  ],
  modules: [
    DbadapterModule
  ]
})
export class AuthModule {}
