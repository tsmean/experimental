"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const local = require("passport-local");
const password_cryptographer_1 = require("./password-cryptographer");
const db_1 = require("./db");
var passportInit;
(function (passportInit) {
    function initializePassportLocalStrategy() {
        const updatedPassport = passport.use('local', new local.Strategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password'
        }, function (email, password, done) {
            db_1.database().dao.readOneByField('email', email, 'users', function (dbResp) {
                if (dbResp.error) {
                    // It's better not to disclose whether username OR password is wrong
                    return done(null, false, { message: 'Wrong password or username.' });
                }
                else if (!dbResp.data) {
                    return done(null, false, { message: 'Wrong password or username.' });
                }
                else {
                    password_cryptographer_1.passwordCryptographer.doCompare(password, dbResp.data.password.hash).then(isMatching => {
                        if (!isMatching) {
                            return done(null, false, { message: 'Wrong password or username.' });
                        }
                        else {
                            return done(null, dbResp.data);
                        }
                    });
                }
            });
        }));
        return updatedPassport ? true : false;
    }
    function init(appRouter) {
        appRouter.use(passport.initialize());
        initializePassportLocalStrategy();
        return 'success';
    }
    passportInit.init = init;
})(passportInit = exports.passportInit || (exports.passportInit = {}));
