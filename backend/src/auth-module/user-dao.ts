import {passwordCryptographer} from './password-cryptographer';
import {User} from './user.model';
import {database} from '../mongo-module';

export namespace userDAO {

  export function create(user: User, password: string, cb: (dbResponse) => void) {

    const userCopy = JSON.parse(JSON.stringify(user));

    database.database.dao.readOneByField('email', userCopy.email, 'users', (dbResp) => {

      // Condition to create a new is user is no user with this email exists
      // This means that a database error is actually what you expect when creating a new user!
      if (dbResp.error) {

        passwordCryptographer.doHash(password).then((hash: string) => {
          userCopy.password = {
            hash: hash,
            algorithm: 'bcrypt'
          };
          database.database.dao.create(userCopy, 'users', cb);
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
    database.database.dao.readOneByField('email', email, 'Users', cb);
  }


  export function getById(id: string, cb: (dbResponse: DatabaseResponse<ReadResponse>) => void) {
    database().dao.read(id, 'Users', cb);
  }

}
