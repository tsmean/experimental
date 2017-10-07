import * as tsmongo from '../mongo-module';
import * as tsmysql from '../mysql-module';

export function dbadapter(databaseType: 'mongo' | 'mysql') {
  switch (databaseType) {
    case 'mongo':
      return tsmongo;
    case 'mysql':
      return tsmysql;
    default:
      throw Error('Database type not implemented!');
  }
}

