"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsmongo = require("tsmongo");
function dao(databaseType) {
    if (databaseType === 'mongo') {
        return tsmongo.dao;
    }
}
exports.dao = dao;
