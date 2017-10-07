import * as tsmongo from '@tsmean/mongo';
import * as tsmysql from '@tsmean/mysql';
export declare function dbadapter(databaseType: 'mongo' | 'mysql'): typeof tsmongo | typeof tsmysql;
