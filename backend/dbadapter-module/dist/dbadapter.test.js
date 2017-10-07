"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbadapter_1 = require("./dbadapter");
const chai = require("chai");
const expect = chai.expect;
describe('DAO Test', () => {
    it('should return correct layer', () => {
        expect(dbadapter_1.dbadapter('mongo')).to.exist;
        expect(dbadapter_1.dbadapter('mongo').dao).to.exist;
        expect(dbadapter_1.dbadapter('mysql')).to.exist;
        expect(dbadapter_1.dbadapter('mysql').dao).to.exist;
    });
});
