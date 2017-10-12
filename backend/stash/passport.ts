import * as passport from 'passport';
import * as local from 'passport-local';
import {PasswordCryptographerService} from './password-cryptographer';
import {Component} from '@nestjs/common';
import {DAO} from '../dbadapter-module';

@Component()
export class PassportInit {

  constructor(
    private dao: DAO,
    private passwordCryptographer: PasswordCryptographerService
  ) { };

  private initializePassportLocalStrategy (): boolean {
    const updatedPassport = passport.use('local', new local.Strategy({
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
    return updatedPassport ? true : false;
  }

  public init (appRouter): string {
    appRouter.use(passport.initialize());
    this.initializePassportLocalStrategy();
    return 'success';
  }

}
