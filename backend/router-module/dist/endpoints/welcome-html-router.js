"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class WelcomeHtmlRouter {
    /**
     * Attach handler to endpoint.
     */
    init() {
        this.router.get('/', this.welcome);
    }
    /**
     * Initialize the WelcomeHtmlRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    welcome(req, res, next) {
        res.status(200)
            .send(`<html><head><title>Welcome</title></head><body><p>Welcome to the TSMEAN Rest Api!</p></body></html>`);
    }
}
exports.WelcomeHtmlRouter = WelcomeHtmlRouter;
// Create the SecondRouter, and export its configured Express.Router
const intialRouter = new WelcomeHtmlRouter();
intialRouter.init();
exports.welcomeHtmlRouter = intialRouter.router;
