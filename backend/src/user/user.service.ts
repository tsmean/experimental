import { Component } from '@nestjs/common';
import {UserWithPassword} from './user-with-password.model';
import {User} from '../../../shared/models/user.model';
import {UserDAO} from './user-dao';
import {CreateUserDto} from './dto/create-user.dto';

@Component()
export class UserService {
  private readonly users: User[] = [];

  constructor(
    private readonly userDAO: UserDAO
  ) { }


  async create(user: CreateUserDto, password: string): Promise<any> {



    // this.userDAO.create(user, password, (dbResponse => {
    //   if (dbResponse.error) {
    //     if (dbResponse.error.message === 'User already exists') {
    //       res.statusMessage = dbResponse.error.message;
    //       res.status(403).send();
    //     } else {
    //       res.statusMessage = dbResponse.error.message;
    //       res.status(500).send();
    //     }
    //   } else {
    //     res.status(200).send({
    //       message: 'Success',
    //       status: res.status,
    //       data: dbResponse.data
    //     });
    //   }
    // }));
    //
    //
    //
  }

  findAll(): User[] {
    return this.users;
  }

}
