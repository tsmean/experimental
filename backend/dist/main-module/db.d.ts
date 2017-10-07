import * as tsmongo from '../mongo-module';
import * as tsmysql from '../mysql-module';
export declare function database(): typeof tsmongo | typeof tsmysql;
