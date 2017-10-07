"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbadapter_module_1 = require("../dbadapter-module");
const db = require('../properties/local.properties').db.type;
function database() {
    return dbadapter_module_1.dbadapter(db);
}
exports.database = database;
;
