import * as mysql from 'mysql';
import { IConnection } from 'mysql';
import { DatabaseConfig } from '../dbadapter-module';
export declare class Database {
    private _database;
    constructor();
    readonly database: mysql.IConnection;
    private genericConnector(dbConfig, nospecificdb);
    connectToDatabase(dbConfig: DatabaseConfig): Promise<IConnection>;
    connectToNoSpecificDatabase(dbConfig: DatabaseConfig): Promise<IConnection>;
}
export declare const database: Database;
