import {PasswordValidator} from '../../../../shared/src/password-validator/password-validator.service';
import {Component} from '@nestjs/common';

@Component()
export class PasswordValidatorImpl extends PasswordValidator {
  constructor() {
    super();
  }
}

