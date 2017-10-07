"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport = require("passport");
class LoginRouter {
    /**
     * Take login handler and attach to login endpoint, but precede it with authentication
     */
    init() {
        this.router.post('/login', passport.authenticate('local', {
            session: false,
            failWithError: true
        }), this.loginHandler, this.errorHandler);
    }
    /**
     * Initialize the login
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    loginHandler(req, res, next) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.status(200).send({
            message: 'Success',
            status: res.status,
            data: req.user
        });
    }
    errorHandler(err, req, res, next) {
        res.statusMessage = 'Wrong username or password.';
        res.status(401).send();
    }
}
exports.LoginRouter = LoginRouter;
// Create the CrudRouter, and export its configured Express.Router
const intialRouter = new LoginRouter();
intialRouter.init();
exports.loginRouter = intialRouter.router;
