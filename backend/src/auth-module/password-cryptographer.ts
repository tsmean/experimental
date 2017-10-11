import * as bcrypt from 'bcrypt-nodejs';
import {Component} from '@nestjs/common';

@Component()
export class PasswordCryptographerService {

  doHash (plaintextPassword: string): Promise<string> {

    return new Promise((resolve, reject) => {

      bcrypt.genSalt(this.saltRounds(), (error, salt) => {
        bcrypt.hash(plaintextPassword, salt, null, function(err, hash) {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      });

    });

  }

  doCompare (plaintextPassword, hash): Promise<boolean> {

    return new Promise((resolve, reject) => {

      bcrypt.compare(plaintextPassword, hash, function(err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });

    });

  }

  private saltRounds() {
    return 5;
  }

}

/*

TODO: Try programming against interface..

export const passwordCryptographer: PasswordCryptographer = new PasswordCryptographerImpl();

export interface PasswordCryptographer {
  doHash (plaintextPassword: string): Promise<string>;
  doCompare (plaintextPassword, hash): Promise<boolean>;
}
*/
