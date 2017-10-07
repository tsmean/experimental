import * as mysql from 'mysql';
import {IConnection, IConnectionConfig} from 'mysql';
import {DatabaseConfig} from '@tsmean/dbadapter';

export class Database {

  private _database: IConnection;

  constructor(
  ) { }

  public get database() {
    return this._database;
  }

  private genericConnector(dbConfig: DatabaseConfig, nospecificdb: boolean): Promise<IConnection> {

    // Connect to the db
    const connectionConfig: IConnectionConfig = {
      host: dbConfig.host,
      user: dbConfig.dbuser,
      password: dbConfig.dbpassword,
      database: dbConfig.dbname,
      port: dbConfig.port
    };
    if (nospecificdb) {
      delete connectionConfig.database;
    }

    return new Promise((resolve, reject) => {

      const con = mysql.createConnection(connectionConfig);
      con.connect((err) => {
        if (!err) {
          this._database = con;
          resolve (con);
        } else {
          reject(err);
        }
      });

    });

  }

  public connectToDatabase (dbConfig: DatabaseConfig): Promise<IConnection> {
    return this.genericConnector(dbConfig, false);
  };

  public connectToNoSpecificDatabase (dbConfig: DatabaseConfig): Promise<IConnection> {
    return this.genericConnector(dbConfig, true);
  };

}

export const database = new Database();


