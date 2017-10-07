/// <reference types="express" />
import { Router, Request, Response, NextFunction } from 'express';
export declare class LoginRouter {
    router: Router;
    /**
     * Take login handler and attach to login endpoint, but precede it with authentication
     */
    init(): void;
    /**
     * Initialize the login
     */
    constructor();
    loginHandler(req: Request, res: Response, next: NextFunction): void;
    errorHandler(err: any, req: any, res: any, next: any): void;
}
export declare const loginRouter: Router;
