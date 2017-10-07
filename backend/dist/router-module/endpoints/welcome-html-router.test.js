"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiHttp = require("chai-http");
const router_1 = require("../router");
chai.use(chaiHttp);
const expect = chai.expect;
describe('Test simple welcome Html Router', () => {
    it('should return html containing the word welcome', (done) => {
        chai.request(router_1.router)
            .get(`/`)
            .then((resp) => {
            expect(resp.text).to.contain('Welcome to the TSMEAN Rest Api!');
            done();
        });
    });
});
