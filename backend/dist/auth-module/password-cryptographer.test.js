"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const password_cryptographer_1 = require("./password-cryptographer");
const expect = chai.expect;
describe('bcrypt', () => {
    it('should be able to encrypt & decrypt', (done) => {
        const mypw = 'Hello World';
        password_cryptographer_1.passwordCryptographer.doHash(mypw).then(encrypted => {
            password_cryptographer_1.passwordCryptographer.doCompare(mypw, encrypted).then((isMatching) => {
                expect(isMatching).to.equal(true);
                done();
            }, (err) => {
                console.error('Error while comparing:');
                console.error(err);
            });
        }, (err) => {
            console.error('Error while encrypting:');
            console.error(err);
        });
    });
    it('shouldnt match wrong passwords', (done) => {
        const mypw = 'Hello World';
        password_cryptographer_1.passwordCryptographer.doHash(mypw).then(encrypted => {
            password_cryptographer_1.passwordCryptographer.doCompare(mypw + ' is wrong', encrypted).then((isMatching) => {
                expect(isMatching).to.equal(false);
                done();
            }, (err) => {
                console.error('Error while comparing:');
                console.error(err);
            });
        }, (err) => {
            console.error('Error while encrypting:');
            console.error(err);
        });
    });
});
