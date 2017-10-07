/// <reference types="express" />
import { Router, Request, Response, NextFunction } from 'express';
export declare class SimpleCrudRouter {
    router: Router;
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init(): void;
    /**
     * Initialize the CrudRouter
     */
    constructor();
    /**
     * CREATE one resource
     */
    create(req: Request, res: Response, next: NextFunction): void;
    /**
     * GET one resource by id
     */
    getOne(req: Request, res: Response, next: NextFunction): void;
    /**
     * UPDATE one resource by id
     */
    updateOne(req: Request, res: Response, next: NextFunction): void;
    /**
     * GET all Resources.
     */
    getAll(req: Request, res: Response, next: NextFunction): void;
    /**
     * DELETE one resource by id
     */
    deleteOne(req: Request, res: Response, next: NextFunction): void;
}
export declare const simpleCrudRouter: Router;
