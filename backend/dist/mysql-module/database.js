"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class Database {
    constructor() { }
    get database() {
        return this._database;
    }
    genericConnector(dbConfig, nospecificdb) {
        // Connect to the db
        const connectionConfig = {
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
                    resolve(con);
                }
                else {
                    reject(err);
                }
            });
        });
    }
    connectToDatabase(dbConfig) {
        return this.genericConnector(dbConfig, false);
    }
    ;
    connectToNoSpecificDatabase(dbConfig) {
        return this.genericConnector(dbConfig, true);
    }
    ;
}
exports.Database = Database;
exports.database = new Database();
