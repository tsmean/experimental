import {dbadapter} from '../dbadapter-module';
import * as tsmongo from '../mongo-module';
import * as tsmysql from '../mysql-module';

const db = require('./properties/local.properties').db;

export function database () {
  return dbadapter(db);
};
