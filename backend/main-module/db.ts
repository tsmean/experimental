import {dbadapter} from '@tsmean/dbadapter';
import * as tsmongo from '@tsmean/mongo';
import * as tsmysql from '@tsmean/mysql';

const db = require('../properties/local.properties').db.type;

export function database () {
  return dbadapter(db);
};
