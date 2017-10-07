import * as tsmongo from '@tsmean/mongo';
import * as tsmysql from '@tsmean/mysql';

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

