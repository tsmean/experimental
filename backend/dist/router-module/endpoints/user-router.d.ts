/// <reference types="express" />
import { Router } from 'express';
export declare class UserRouter {
    router: Router;
    /**
     * Take login handler and attach to login endpoint, but precede it with authentication
     */
    init(): void;
    /**
     * Initialize the login
     */
    constructor();
    private postHandler(req, res, next);
    private getHandler(req, res, next);
}
export declare const userRouter: Router;
