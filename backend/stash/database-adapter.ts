import {MongoDAO} from '../mongo-module/dao';

const databaseType = 'mongo';

class DatabaseAdapter {
  get dao() {
    if (databaseType === 'mongo') {
      return dao;
    } else {
      console.error('currently no other databases are implemented');
    }
  }
}
export const databaseAdapter = new DatabaseAdapter();
