import * as tsmongo from '../mongo-module';
import * as tsmysql from '../mysql-module';
export declare function dbadapter(databaseType: 'mongo' | 'mysql'): typeof tsmongo | typeof tsmysql;
