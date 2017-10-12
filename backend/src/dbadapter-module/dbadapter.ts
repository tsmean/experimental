import {MongoDAO} from '../mongo-module/mongo-dao';
import {Component} from '@nestjs/common';
import {GenericCrudDao} from './dao.model';

@Component()
export class DbAdapter {

  constructor(
    private mongoDAO: MongoDAO
  ) {}

  appDAO (): GenericCrudDao {
    return this.mongoDAO;
  }

  testDAO(): GenericCrudDao {
    return this.mongoDAO;
  }

}
