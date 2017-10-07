/// <reference types="express" />
import { Router, Request, Response, NextFunction } from 'express';
export declare class WelcomeHtmlRouter {
    router: Router;
    /**
     * Attach handler to endpoint.
     */
    init(): void;
    /**
     * Initialize the WelcomeHtmlRouter
     */
    constructor();
    welcome(req: Request, res: Response, next: NextFunction): void;
}
export declare const welcomeHtmlRouter: Router;
