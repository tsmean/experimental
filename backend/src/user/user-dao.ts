import {CreateResponse, DatabaseResponse, ReadResponse} from '../dbadapter-module/database.model';
import {dao} from '../mongo-module/dao';
import {User} from '../../../shared/models/user.model';
import {Component} from '@nestjs/common';
import {PasswordCryptographerService} from '../auth-module/password-cryptographer';

@Component()
export class UserDAO {

  constructor(
    private readonly passwordCryptographer: PasswordCryptographerService
  ) { }

   create(user: User, password: string, cb: (dbResponse: DatabaseResponse<CreateResponse>) => void) {

    const userCopy = JSON.parse(JSON.stringify(user));

    dao.readOneByField('email', userCopy.email, 'users', (dbResp) => {

      // Condition to create a new is user is no user with this email exists
      // This means that a database error is actually what you expect when creating a new user!
      if (dbResp.error) {

        this.passwordCryptographer.doHash(password).then((hash: string) => {
          userCopy.password = {
            hash: hash,
            algorithm: 'bcrypt'
          };
          dao.create(userCopy, 'users', cb);
        }, (err) => {
          return cb({
            error: {
              message: 'Problem with hashing'
            }
          });
        });

      } else {
        // if a user with this email exists, deny creation
        return cb({
          error: {
            message: 'User already exists'
          }
        });
      }
    });

  }

   getByMail(email: string, cb: (dbResponse: DatabaseResponse<ReadResponse>) => void) {
    dao.readOneByField('email', email, 'Users', cb);
  }


   getById(id: string, cb: (dbResponse: DatabaseResponse<ReadResponse>) => void) {
    dao.read(id, 'Users', cb);
  }

}
