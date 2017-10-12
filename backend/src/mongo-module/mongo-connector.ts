import * as mongo from 'mongodb';
import {Db} from 'mongodb';
import {Component} from '@nestjs/common';
import {DatabaseConfig} from '../dbadapter-module/database-config.model';

@Component()
export class MongoConnector {

  private _database;
  private _mongoClient = mongo.MongoClient;

  private mongoUri = (databaseConfig: DatabaseConfig) => {
    return `mongodb://${databaseConfig.dbuser}` +
    `:${databaseConfig.dbpassword}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.dbname}`;
  }

  constructor() {}

  public get database() {
    return this._database;
  }

  public connectToDatabase (databaseConfig: DatabaseConfig, callback?: (database: Db) => any) {

    // Connect to the db
    this._mongoClient.connect(this.mongoUri(databaseConfig), (err, db) => {
      if (!err) {
        this._database = db;
        if (callback) {
          callback(db);
        }
      } else {
        console.error('Error while connecting to Database:');
        console.error(err);
      }
    });

  };

  public connectToDatabasePromise (databaseConfig: DatabaseConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      this._mongoClient.connect(this.mongoUri(databaseConfig), (err, db) => {
        if (!err) {
          this._database = db;
          resolve(db);
        } else {
          console.error('Error while connecting to Database:');
          console.error(err);
          reject(err);
        }
      });
    });
  }

}
