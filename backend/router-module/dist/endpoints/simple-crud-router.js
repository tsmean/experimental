"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_1 = require("../api");
const db_1 = require("../db");
class SimpleCrudRouter {
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.post('/:resource', this.create);
        this.router.get('/:resource', this.getAll);
        this.router.get('/:resource/:id', this.getOne);
        this.router.put('/:resource', this.updateOne);
        this.router.delete('/:resource/:id', this.deleteOne);
    }
    /**
     * Initialize the CrudRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * CREATE one resource
     */
    create(req, res, next) {
        const resource = req.body;
        const resourceName = req.params.resource;
        db_1.database().dao.create(resource, resourceName, (dbResp) => {
            if (dbResp.error) {
                res.status(500).send({
                    message: 'Server error',
                    status: res.status
                });
            }
            else {
                res.status(201);
                res.location(`${api_1.api.root()}/${resourceName}/${dbResp.data.insertId}`)
                    .send({
                    message: 'Success',
                    status: res.status,
                    data: dbResp.data
                });
            }
        });
    }
    /**
     * GET one resource by id
     */
    getOne(req, res, next) {
        const resourceId = req.params.id;
        const resourceName = req.params.resource;
        db_1.database().dao.read(resourceId, resourceName, (dbResp) => {
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
    /**
     * UPDATE one resource by id
     */
    updateOne(req, res, next) {
        const resourceName = req.params.resource;
        db_1.database().dao.update(req.body, resourceName, (dbResp) => {
            if (dbResp.error) {
                res.status(500).send({
                    message: `Database error:(${dbResp.error.code}) ${dbResp.error.message}`,
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
    /**
     * GET all Resources.
     */
    getAll(req, res, next) {
        const resourceName = req.params.resource;
        db_1.database().dao.readAll(resourceName, (dbResp) => {
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
    /**
     * DELETE one resource by id
     */
    deleteOne(req, res, next) {
        const resourceId = req.params.id;
        const resourceName = req.params.resource;
        db_1.database().dao.remove(resourceId, resourceName, (dbResp) => {
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
                    status: res.status
                });
            }
        });
    }
}
exports.SimpleCrudRouter = SimpleCrudRouter;
// Create the CrudRouter, and export its configured Express.Router
const intialRouter = new SimpleCrudRouter();
intialRouter.init();
exports.simpleCrudRouter = intialRouter.router;
