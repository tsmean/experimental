import { Module } from '@nestjs/common';
import {PassportInit} from './passport';
import {PasswordCryptographerService} from './password-cryptographer';

@Module({
  components: [
    PassportInit,
    PasswordCryptographerService
  ],
  exports: [
    PasswordCryptographerService
  ]
})
export class AuthModule {}
