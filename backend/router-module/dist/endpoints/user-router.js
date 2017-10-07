"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("@tsmean/auth");
const db_1 = require("../db");
class UserRouter {
    /**
     * Take login handler and attach to login endpoint, but precede it with authentication
     */
    init() {
        this.router.post('/users', this.postHandler);
        this.router.get('/users/:id', this.getHandler);
    }
    /**
     * Initialize the login
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    postHandler(req, res, next) {
        auth_1.userDAO.create(req.body.user, req.body.password, (dbResponse => {
            if (dbResponse.error) {
                if (dbResponse.error.message === 'User already exists') {
                    res.statusMessage = dbResponse.error.message;
                    res.status(403).send();
                }
                else {
                    res.statusMessage = dbResponse.error.message;
                    res.status(500).send();
                }
            }
            else {
                res.status(200).send({
                    message: 'Success',
                    status: res.status,
                    data: dbResponse.data
                });
            }
        }));
    }
    getHandler(req, res, next) {
        const userId = req.params.id;
        db_1.database().dao.read(userId, 'users', (dbResp) => {
            if (dbResp.error) {
                res.status(500).send({
                    message: 'Server error',
                    status: res.status
                });
            }
            else {
                res.status(200)
                    .send({
                    message: 'Success',
                    status: res.status,
                    data: dbResp.data
                });
            }
        });
    }
}
exports.UserRouter = UserRouter;
// Create the CrudRouter, and export its configured Express.Router
const intialRouter = new UserRouter();
intialRouter.init();
exports.userRouter = intialRouter.router;
