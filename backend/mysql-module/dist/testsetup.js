"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
var setupTests;
(function (setupTests) {
    function connectTestToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            return beforeEach('connect to db', (done) => {
                doAsyncStuff(done);
            });
        });
    }
    setupTests.connectTestToDatabase = connectTestToDatabase;
})(setupTests = exports.setupTests || (exports.setupTests = {}));
function getConfig() {
    return require('../properties/test.properties.json');
}
;
function doAsyncStuff(done) {
    return __awaiter(this, void 0, void 0, function* () {
        const con = yield database_1.database.connectToNoSpecificDatabase(getConfig());
        yield dropDatabase(con);
        yield createDatabase(con);
        const con2 = yield getNewConnection();
        yield createTables(con2);
        done();
    });
}
function getNewConnection() {
    return database_1.database.connectToDatabase(getConfig());
}
function createDatabase(con) {
    return new Promise((resolve, reject) => {
        con.query(`CREATE DATABASE ??`, [getConfig().dbname], (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}
function dropDatabase(con) {
    const sql = `DROP DATABASE ??`;
    return new Promise((resolve, reject) => {
        con.query(sql, [getConfig().dbname], (err, result) => {
            resolve(result);
        });
    });
}
function createTables(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        yield createUsersTable(connection);
        yield createHeroesTable(connection);
        yield createItemsTable(connection);
    });
}
function createUsersTable(connection) {
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
function createHeroesTable(connection) {
    connection.query(`CREATE TABLE heroes (
    _id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    createTime DATETIME NOT NULL,
    updateTime DATETIME,
    PRIMARY KEY (_id)
);`);
}
function createItemsTable(connection) {
    connection.query(`CREATE TABLE items (
    _id int NOT NULL AUTO_INCREMENT,
    hello varchar(50) NOT NULL,
    createTime DATETIME NOT NULL,
    updateTime DATETIME,
    PRIMARY KEY (_id)
);`);
}
