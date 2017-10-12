import { Component, Inject } from '@nestjs/common';
import {Repository} from 'typeorm';
import {User, UserPassword} from './user.entity';
import {HASHING_ALGORITHM, USER_PASSWORD_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN} from '../constants';
import {DeepPartial} from 'typeorm/common/DeepPartial';
import {IUser} from '../../../shared/models/user.model';

@Component()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN) private readonly userRepository: Repository<User>,
    @Inject(USER_PASSWORD_REPOSITORY_TOKEN) private readonly userPasswordRepository: Repository<UserPassword>
  ) {}

  // Create
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

  async findOneByMail(mail: string): Promise<User> {
    return await this.userRepository.findOne({
      mail: mail
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
