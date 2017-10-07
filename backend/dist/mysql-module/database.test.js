"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiHttp = require("chai-http");
const database_1 = require("./database");
const testsetup_1 = require("./testsetup");
chai.use(chaiHttp);
const expect = chai.expect;
describe('Connect Test', () => {
    testsetup_1.setupTests.connectTestToDatabase();
    it('should be able to write to db', function (done) {
        const item = {
            text: 'Hello World'
        };
        expect(database_1.database.database !== undefined).to.be.true;
        const sql = `INSERT INTO users (email, firstName, lastName) VALUES ('bla@bla.com', 'Urs', 'Schweizer')`;
        database_1.database.database.query(sql, function (err, result) {
            expect(err).to.equal(null);
            expect(result.affectedRows).to.equal(1);
            done();
        });
    });
});
