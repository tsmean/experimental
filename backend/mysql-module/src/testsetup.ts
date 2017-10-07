import {database} from './database';
import * as mysql from 'mysql';

import {IConnection} from 'mysql';
import {DatabaseConfig} from '@tsmean/dbadapter';


export namespace setupTests {

  export async function connectTestToDatabase() {
    return beforeEach('connect to db', (done) => {
      doAsyncStuff(done);
    });
  }

}


function getConfig(): DatabaseConfig {
  return require('../properties/test.properties.json');
};


async function doAsyncStuff (done) {
  const con = await database.connectToNoSpecificDatabase(getConfig());
  await dropDatabase(con);
  await createDatabase(con);
  const con2 = await getNewConnection();
  await createTables(con2);
  done();
}

function getNewConnection(): Promise<IConnection> {
  return database.connectToDatabase(getConfig());
}

function createDatabase (con: IConnection): Promise<any> {
  return new Promise((resolve, reject) => {

    con.query(`CREATE DATABASE ??`, [getConfig().dbname], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}


function dropDatabase(con): Promise<any> {
  const sql = `DROP DATABASE ??`;


  return new Promise((resolve, reject) => {
    con.query(sql, [getConfig().dbname], (err, result) => {
      resolve(result);
    });
  });

}

async function createTables(connection) {
  await createUsersTable(connection);
  await createHeroesTable(connection);
  await createItemsTable(connection);
}

function createUsersTable (connection) {
  connection.query(`CREATE TABLE users (
    _id int NOT NULL AUTO_INCREMENT,
    email varchar(50) NOT NULL,
    firstName varchar(35) NOT NULL,
    lastName varchar(35) NOT NULL,
    createTime DATETIME NOT NULL,
    updateTime DATETIME,
    birthday DATE,
    gender TINYINT(1),
    password VARCHAR(255),
    PRIMARY KEY (_id)
);`);
}

function createHeroesTable (connection) {
  connection.query(`CREATE TABLE heroes (
    _id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    createTime DATETIME NOT NULL,
    updateTime DATETIME,
    PRIMARY KEY (_id)
);`);
}

function createItemsTable (connection) {
  connection.query(`CREATE TABLE items (
    _id int NOT NULL AUTO_INCREMENT,
    hello varchar(50) NOT NULL,
    createTime DATETIME NOT NULL,
    updateTime DATETIME,
    PRIMARY KEY (_id)
);`);
}
