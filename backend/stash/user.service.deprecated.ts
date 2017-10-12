import { Component } from '@nestjs/common';
import {UserWithPassword} from './user-with-password.model';
import {User} from '../../../shared/models/user.model';
import {UserDAO} from './user-dao';

@Component()
export class UserService {
  private readonly users: User[] = [];

  constructor(
    private readonly userDAO: UserDAO
  ) { }

  async create(user: User, password: string): Promise<any> {

    return new Promise((resolve, reject) => {
      this.userDAO.create(user, password, (dbResponse => {
        if (dbResponse.error) {
          reject(dbResponse.error);
        } else {
          resolve(dbResponse.data);
        }
      }));
    });

  }

  async findAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userDAO.getAll(dbResp => {
        if (dbResp.error) {
          reject(dbResp.error);
        } else {
          resolve(dbResp.data);
        }
      });
    });
  }

  async findOneById(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userDAO.getById(id, dbResp => {
        if (dbResp.error) {
          reject(dbResp.error);
        } else {
          resolve(dbResp.data);
        }
      });
    });
  }

  async findOneByMail(mail): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userDAO.getByMail(mail, dbResp => {
        if (dbResp.error) {
          reject(dbResp.error);
        } else {
          resolve(dbResp.data);
        }
      });
    });
  }

}
