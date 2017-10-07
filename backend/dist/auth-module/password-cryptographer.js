"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt-nodejs");
var passwordCryptographer;
(function (passwordCryptographer) {
    function saltRounds() {
        return 5;
    }
    function doHash(plaintextPassword) {
        return new Promise(function (resolve, reject) {
            bcrypt.genSalt(saltRounds(), (error, salt) => {
                bcrypt.hash(plaintextPassword, salt, null, function (err, hash) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(hash);
                    }
                });
            });
        });
    }
    passwordCryptographer.doHash = doHash;
    function doCompare(plaintextPassword, hash) {
        return new Promise(function (resolve, reject) {
            bcrypt.compare(plaintextPassword, hash, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    }
    passwordCryptographer.doCompare = doCompare;
})(passwordCryptographer = exports.passwordCryptographer || (exports.passwordCryptographer = {}));
