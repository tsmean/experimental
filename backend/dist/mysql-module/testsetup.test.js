"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiHttp = require("chai-http");
const testsetup_1 = require("./testsetup");
chai.use(chaiHttp);
const expect = chai.expect;
describe('Connect Test', () => {
    testsetup_1.setupTests.connectTestToDatabase();
    it('should be able to execute before eachs', function (done) {
        done();
    });
});
