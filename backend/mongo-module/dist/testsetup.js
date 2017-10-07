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
                database_1.database.connectToDatabase(getConfig(), (db) => {
                    db.dropDatabase().then(() => {
                        done();
                    });
                });
            });
        });
    }
    setupTests.connectTestToDatabase = connectTestToDatabase;
    function getConfig() {
        return require('../properties/test.properties.json');
    }
    setupTests.getConfig = getConfig;
    ;
})(setupTests = exports.setupTests || (exports.setupTests = {}));
