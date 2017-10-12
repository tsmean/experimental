import {CreateResponse, DatabaseResponse, ReadResponse} from '../dbadapter-module/database.model';
import {User} from '../../../shared/models/user.model';
import {Component} from '@nestjs/common';
import {PasswordCryptographerService} from './password-cryptographer';
import {GenericCrudDao} from '../dbadapter-module/dao.model';

@Component()
export class UserDAO {

  constructor(
    private readonly dao: GenericCrudDao,
    private readonly passwordCryptographer: PasswordCryptographerService
  ) { }

   create(user: User, password: string, cb: (dbResponse: DatabaseResponse<CreateResponse>) => void) {

    const userCopy = JSON.parse(JSON.stringify(user));

    this.dao.readOneByField('email', userCopy.email, 'users', (dbResp) => {

      // Condition to create a new is user is no user with this email exists
      // This means that a database error is actually what you expect when creating a new user!
      if (dbResp.error) {

        this.passwordCryptographer.doHash(password).then((hash: string) => {
          userCopy.password = {
            hash: hash,
            algorithm: 'bcrypt'
          };
          this.dao.create(userCopy, 'users', cb);
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
    this.dao.readOneByField('email', email, 'users', cb);
  }


   getById(id: string, cb: (dbResponse: DatabaseResponse<ReadResponse>) => void) {
    this.dao.read(id, 'users', cb);
  }

  getAll(cb: (dbResponse: DatabaseResponse<ReadResponse>) => void) {
    this.dao.readAll('users', cb);
  }


}
