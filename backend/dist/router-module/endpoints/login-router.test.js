"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiHttp = require("chai-http");
const router_1 = require("../router");
const assert = require("assert");
const db_1 = require("../db");
const auth_module_1 = require("../../auth-module");
chai.use(chaiHttp);
const expect = chai.expect;
describe('LoginRouter', () => {
    db_1.database().setupTests.connectTestToDatabase();
    it('should be able to login', (done) => {
        const user = {
            email: 'hans'
        };
        const plaintextPassword = 'Hello World';
        auth_module_1.userDAO.create(user, plaintextPassword, (dbResp) => {
            expect(dbResp.error).to.be.null;
            chai.request(router_1.router)
                .post(`/api/v1/login`)
                .send({
                email: user.email,
                password: plaintextPassword
            })
                .then((resp) => {
                expect(resp.body.data.uid).to.equal(dbResp.data.uid);
                done();
            }, (err) => {
                console.error(err);
                assert(false);
                done();
            })
                .catch((err) => {
                throw err;
            });
        });
    });
    it('shouldnt be able to login with wrong password', (done) => {
        const user = {
            email: 'hans'
        };
        const plaintextPassword = 'Hello World';
        auth_module_1.userDAO.create(user, plaintextPassword, (dbResp) => {
            expect(dbResp.error).to.be.null;
            chai.request(router_1.router)
                .post('/api/v1/login')
                .send({
                email: user.email,
                password: 'some wrong password'
            })
                .catch((err) => {
                expect(err.response.res.statusCode).to.equal(401);
                done();
            });
        });
    });
});
