"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsmongo = require("../mongo-module");
const tsmysql = require("../mysql-module");
function dbadapter(databaseType) {
    switch (databaseType) {
        case 'mongo':
            return tsmongo;
        case 'mysql':
            return tsmysql;
        default:
            throw Error('Database type not implemented!');
    }
}
exports.dbadapter = dbadapter;
