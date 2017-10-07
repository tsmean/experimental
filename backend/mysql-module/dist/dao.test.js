"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const dao_1 = require("./dao");
const testsetup_1 = require("./testsetup");
const expect = chai.expect;
describe('DAO', () => {
    testsetup_1.setupTests.connectTestToDatabase();
    it('should be able to create', (done) => {
        const user = {
            firstName: 'Brandon',
            lastName: 'Stark',
            email: 'brandon.stark@gmail.com'
        };
        dao_1.dao.create(user, 'users', (dbResp) => {
            expect(dbResp.error).to.equal(null);
            expect(dbResp.data.uid).to.equal(1);
            done();
        });
    });
    it('should be able to read one', (done) => {
        const user = {
            firstName: 'Brandon',
            lastName: 'Stark',
            email: 'brandon.stark@gmail.com'
        };
        dao_1.dao.create(user, 'users', (dbResp) => {
            expect(dbResp.error).to.equal(null);
            expect(dbResp.data.uid).to.equal(1);
            dao_1.dao.read(1, 'users', (innerDbResp) => {
                expect(innerDbResp.error).to.equal(null);
                expect(innerDbResp.data.uid).to.equal(1);
                expect(innerDbResp.data.firstName).to.equal('Brandon');
                done();
            });
        });
    });
    it('should be able to read one by field', (done) => {
        const user = {
            firstName: 'Brandon',
            lastName: 'Stark',
            email: 'brandon.stark@gmail.com'
        };
        dao_1.dao.create(user, 'users', (dbResp) => {
            expect(dbResp.error).to.equal(null);
            expect(dbResp.data.uid).to.equal(1);
            dao_1.dao.readOneByField('email', user.email, 'users', (innerDbResp) => {
                expect(innerDbResp.error).to.equal(null);
                expect(innerDbResp.data.uid).to.equal(1);
                expect(innerDbResp.data.firstName).to.equal('Brandon');
                done();
            });
        });
    });
    it('should be able to update', (done) => {
        const user = {
            firstName: 'Brandon',
            lastName: 'Stark',
            email: 'brandon.stark@gmail.com',
        };
        dao_1.dao.create(user, 'users', (dbResp) => {
            expect(dbResp.error).to.equal(null);
            expect(dbResp.data.uid).to.equal(1);
            user.uid = 1;
            user.firstName = 'Sansa';
            dao_1.dao.update(user, 'users', (innerDbResp) => {
                expect(innerDbResp.error).to.equal(null);
                expect(innerDbResp.data.firstName).to.equal('Sansa');
                done();
            });
        });
    });
    it('should be able to remove', (done) => {
        const user = {
            firstName: 'Brandon',
            lastName: 'Stark',
            email: 'brandon.stark@gmail.com',
        };
        dao_1.dao.create(user, 'users', (dbResp) => {
            expect(dbResp.error).to.equal(null);
            expect(dbResp.data.uid).to.equal(1);
            dao_1.dao.remove(1, 'users', (innerDbResp) => {
                expect(innerDbResp.error).to.equal(null);
                done();
            });
        });
    });
    it('should be able read all', (done) => {
        const user = {
            firstName: 'Brandon',
            lastName: 'Stark',
            email: 'brandon.stark@gmail.com',
        };
        dao_1.dao.create(user, 'users', (dbResp) => {
            expect(dbResp.error).to.equal(null);
            expect(dbResp.data.uid).to.equal(1);
            dao_1.dao.readAll('users', (innerDbResp) => {
                expect(innerDbResp.error).to.equal(null);
                expect(innerDbResp.data.length).to.equal(1);
                done();
            });
        });
    });
});
