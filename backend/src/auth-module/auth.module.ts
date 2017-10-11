import { Module } from '@nestjs/common';
import {PassportInit} from './passport';
import {PasswordCryptographerService} from './password-cryptographer';
import {DbadapterModule} from '../dbadapter-module/dbadapter.module';
import {DAO} from '../dbadapter-module';

@Module({
  components: [
    PassportInit,
    PasswordCryptographerService
  ],
  exports: [
    PasswordCryptographerService,
    DAO
  ],
  modules: [
    DbadapterModule
  ]
})
export class AuthModule {}
