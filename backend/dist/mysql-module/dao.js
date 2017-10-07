"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
// Database Access Object
// Everything that operates directly on the database goes here
// i.e. everything that has to do anything with mongodb
// goal is to abstract away MongoDB stuff and localize in one place, so if you want to swap e.g. for a relational DB
// it's not too much effort
// also, don't expose Mongo API directly, but program against an interface (DatabaseResponse)
var dao;
(function (dao) {
    function read(id, tableName, cb) {
        const sql = 'SELECT * from ?? WHERE _id = ? LIMIT 1';
        database_1.database.database.query(sql, [tableName, id], (err, data) => {
            if (err) {
                cb({
                    error: {
                        message: err.code
                    }
                });
            }
            else {
                if (data) {
                    cb({
                        error: null,
                        data: morphDataOnRetrieval(data)[0]
                    });
                }
                else {
                    cb({
                        error: {
                            message: 'not found'
                        }
                    });
                }
            }
        });
    }
    dao.read = read;
    function readAll(tableName, cb) {
        database_1.database.database.query('SELECT * from ??', [tableName], (err, data) => {
            if (err) {
                cb({
                    error: {
                        message: err.code
                    }
                });
            }
            else {
                if (data) {
                    cb({
                        error: null,
                        data: morphDataOnRetrieval(data)
                    });
                }
                else {
                    cb({
                        error: {
                            message: 'not found'
                        }
                    });
                }
            }
        });
    }
    dao.readAll = readAll;
    function readOneByField(fieldName, fieldValue, tableName, cb) {
        const sql = 'SELECT * from ?? WHERE ?? = ? LIMIT 1';
        database_1.database.database.query(sql, [tableName, fieldName, fieldValue], (err, data) => {
            if (err) {
                cb({
                    error: {
                        message: err.code
                    }
                });
            }
            else {
                if (data) {
                    cb({
                        error: null,
                        data: morphDataOnRetrieval(data)[0]
                    });
                }
                else {
                    cb({
                        error: {
                            message: 'not found'
                        }
                    });
                }
            }
        });
    }
    dao.readOneByField = readOneByField;
    function create(item, tableName, cb) {
        const keyValuePairs = [];
        Object.keys(item).forEach(key => {
            keyValuePairs.push([key, item[key]]);
        });
        keyValuePairs.push(['createTime', 'now()']);
        const l = keyValuePairs.length;
        const keyReplacement = Array(l).fill('??').join(', ');
        const valueReplacement = Array(l).fill('?').join(', ');
        const sql = `INSERT INTO ?? (${keyReplacement}) VALUES (${valueReplacement})`;
        database_1.database.database.query(sql, [tableName, ...keyValuePairs.map(x => x[0]), ...keyValuePairs.map(x => x[1])], (err, data) => {
            if (err) {
                cb({
                    error: {
                        message: err.code
                    }
                });
            }
            else {
                if (data) {
                    // Retrieve data from database, so the client has the updated object with id, timestamp etc.
                    dao.read(data.insertId, tableName, (innerDbResp) => {
                        if (innerDbResp.error) {
                            cb({ error: innerDbResp.error });
                        }
                        else {
                            cb({
                                error: null,
                                data: innerDbResp.data
                            });
                        }
                    });
                }
                else {
                    cb({
                        error: {
                            message: 'not found'
                        }
                    });
                }
            }
        });
    }
    dao.create = create;
    function update(item, tableName, cb) {
        const morphedItem = morphDataOnStorage(item);
        const id = morphedItem._id;
        delete morphedItem._id;
        const keyValuePairs = [];
        Object.keys(morphedItem).forEach(key => {
            keyValuePairs.push([key, morphedItem[key]]);
        });
        const l = keyValuePairs.length;
        const keyValueReplacement = Array(l).fill('?? = ?').join(', ');
        const sql = `UPDATE ?? SET ${keyValueReplacement} WHERE _id = ?`;
        const mergedArray = [];
        keyValuePairs.forEach(pair => {
            mergedArray.push(pair[0]);
            mergedArray.push(pair[1]);
        });
        database_1.database.database.query(sql, [tableName, ...mergedArray, id], (err, updateResponseFromDatabase) => {
            if (err) {
                cb({
                    error: {
                        message: err.code
                    }
                });
            }
            else {
                if (updateResponseFromDatabase) {
                    if (updateResponseFromDatabase.affectedRows === 1) {
                        // Retrieve data from database, so the client has the updated object with id, timestamp etc.
                        dao.read(id, tableName, (innerDbResp) => {
                            if (innerDbResp.error) {
                                cb({ error: innerDbResp.error });
                            }
                            else {
                                cb({
                                    error: null,
                                    data: innerDbResp.data
                                });
                            }
                        });
                    }
                    else {
                        cb({
                            error: {
                                message: `Instead of 1, there were ${updateResponseFromDatabase.affectedRows} rows affected`
                            }
                        });
                    }
                }
                else {
                    cb({
                        error: {
                            message: 'not found'
                        }
                    });
                }
            }
        });
    }
    dao.update = update;
    function remove(id, tableName, cb) {
        const sql = `DELETE FROM ?? WHERE _id=?`;
        database_1.database.database.query(sql, [tableName, id], (err, data) => {
            if (err) {
                cb({
                    error: {
                        message: err.code
                    }
                });
            }
            else {
                if (data && data.affectedRows === 1) {
                    cb({
                        error: null,
                        data: null
                    });
                }
                else {
                    cb({
                        error: {
                            message: `deleted ${data.affectedRows} items`
                        }
                    });
                }
            }
        });
    }
    dao.remove = remove;
    function morphDataOnRetrieval(data) {
        if (!data) {
            console.error('No data!');
            return;
        }
        const dataCopy = JSON.parse(JSON.stringify(data));
        const morphResource = (resource) => {
            resource.uid = resource._id;
            delete resource._id;
        };
        if (Array.isArray(dataCopy)) {
            dataCopy.forEach(resource => {
                morphResource(resource);
            });
        }
        else {
            morphResource(dataCopy);
        }
        // Array is returned
        return dataCopy;
    }
    ;
    function morphDataOnStorage(data) {
        const dataCopy = JSON.parse(JSON.stringify(data));
        dataCopy._id = data.uid;
        delete dataCopy.uid;
        return dataCopy;
    }
    ;
})(dao = exports.dao || (exports.dao = {}));
