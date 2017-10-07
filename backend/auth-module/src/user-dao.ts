import {passwordCryptographer} from './password-cryptographer';
import {User} from './user.model';
import {CreateResponse, DatabaseResponse, ReadResponse} from '@tsmean/dbadapter';
import {database} from './db';


export namespace userDAO {

  export function create(user: User, password: string, cb: (dbResponse: DatabaseResponse<CreateResponse>) => void) {

    const userCopy = JSON.parse(JSON.stringify(user));

    database().dao.readOneByField('email', userCopy.email, 'users', (dbResp) => {

      // Condition to create a new is user is no user with this email exists
      // This means that a database error is actually what you expect when creating a new user!
      if (dbResp.error) {

        passwordCryptographer.doHash(password).then((hash: string) => {
          userCopy.password = {
            hash: hash,
            algorithm: 'bcrypt'
          };
          database().dao.create(userCopy, 'users', cb);
        }, (err) => {
          return cb({
            error: {
              message: 'Problem during hashing'
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

  export function getByMail(email: string, cb: (dbResponse: DatabaseResponse<ReadResponse>) => void) {
    database().dao.readOneByField('email', email, 'Users', cb);
  }


  export function getById(id: string, cb: (dbResponse: DatabaseResponse<ReadResponse>) => void) {
    database().dao.read(id, 'Users', cb);
  }

}
