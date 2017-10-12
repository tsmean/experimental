import * as passport from 'passport';
import * as local from 'passport-local';
import { Component, Inject } from '@nestjs/common';
import {PasswordCryptographerService} from './password-cryptographer';
import {DAO} from '../dbadapter-module';

@Component()
export class LocalStrategy {
  constructor(
    private readonly passwordCryptographer: PasswordCryptographerService,
    private readonly dao: DAO
  ) {
    passport.use('local', new local.Strategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password'
      }, (email, password, done) => {
        this.dao.readOneByField('email', email, 'users', (dbResp) => {
          if (dbResp.error) {
            // It's better not to disclose whether username OR password is wrong
            return done(null, false, { message: 'Wrong password or username.' });
          } else if (!dbResp.data) {
            return done(null, false, { message: 'Wrong password or username.' });
          } else {
            this.passwordCryptographer.doCompare(password, dbResp.data.password.hash).then(isMatching => {
              if (!isMatching) {
                return done(null, false, { message: 'Wrong password or username.' });
              } else {
                return done(null, dbResp.data);
              }
            });
          }
        });
      }
    ));
  }

}
