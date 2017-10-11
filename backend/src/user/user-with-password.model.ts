import {User} from '../../../shared/models/user.model';

export interface UserWithPassword extends User {
  password: UserPassword;
}

export interface UserPassword {
  hash: string;
  algorithm: HashingAlgorithm;
}

export type HashingAlgorithm = 'bcrypt';
