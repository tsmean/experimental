"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbadapter_1 = require("@tsmean/dbadapter");
const db = require('../properties/local.properties').db;
function database() {
    return dbadapter_1.dbadapter(db);
}
exports.database = database;
;
