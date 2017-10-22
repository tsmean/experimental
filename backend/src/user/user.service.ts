import { Component, Inject } from '@nestjs/common';
import {Repository} from 'typeorm';
import {User} from './user.entity';
import {HASHING_ALGORITHM, USER_PASSWORD_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN} from './constants';
import {DeepPartial} from 'typeorm/common/DeepPartial';
import {UserPassword} from './user-password.entity';
import {IUser} from '../../../shared/src/models/user.model';

@Component()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: Repository<User>,
    @Inject(USER_PASSWORD_REPOSITORY_TOKEN) private readonly userPasswordRepository: Repository<UserPassword>
  ) {}

  // Create
  // Precondition: the user needs to have a unique email address
  async create(userDto: IUser, password: string): Promise<User> {

    const userPassword: UserPassword = new UserPassword();
    userPassword.hash = password;
    userPassword.algorithm = HASHING_ALGORITHM;

    const user = new User();
    Object.assign(user, userDto);
    user.password = userPassword;

    await this.userPasswordRepository.save(userPassword); // TODO: implement a catch
    return await this.userRepository.save(user);

  }

  // Read
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOneById(id);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      email: email
    });
  }

  emailIsTaken (email: string): Promise<boolean> {
    return this.findOneByEmail(email).then(user => {
      return !!user;
    });
  }

  // Update
  async update(id: number, partialEntry: DeepPartial<User>): Promise<void> {
    return await this.userRepository.updateById(id, partialEntry);
  }

  // Delete
  async remove(id: number): Promise<void> {
    return await this.userRepository.removeById(id);
  }

}
