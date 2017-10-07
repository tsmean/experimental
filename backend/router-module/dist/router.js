"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const welcome_html_router_1 = require("./endpoints/welcome-html-router");
const login_router_1 = require("./endpoints/login-router");
const simple_crud_router_1 = require("./endpoints/simple-crud-router");
const user_router_1 = require("./endpoints/user-router");
const bodyParser = require("body-parser");
const auth_1 = require("@tsmean/auth");
// Creates and configures an ExpressJS web server.
class Router {
    // Run configuration methods on the Express instance.
    constructor() {
        this.appRouter = express();
        this.appRouter.use(bodyParser.json());
        this.appRouter.use(bodyParser.urlencoded({ extended: false }));
        // passport config
        auth_1.passportInit.init(this.appRouter);
        // intercept favicon
        this.appRouter.get('/favicon.ico', function (req, res) {
            res.status(204);
        });
        this.routes();
    }
    // Configure API endpoints.
    routes() {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        const router = express.Router();
        // Allow CORS since frontend is served completely independently
        this.appRouter.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE, PATCH');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        this.appRouter.use('/', welcome_html_router_1.welcomeHtmlRouter);
        // API
        this.appRouter.use('/api/v1/', login_router_1.loginRouter);
        this.appRouter.use('/api/v1/', user_router_1.userRouter);
        // The simpleCrudRouter one should stay last, since it covers quite a broad range of requests and if it's moved above
        // it will steal away the endpoints of the more specific implementations
        this.appRouter.use('/api/v1/', simple_crud_router_1.simpleCrudRouter);
    }
}
exports.router = new Router().appRouter;
