"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const passport_1 = require("./passport");
const express = require("express");
const expect = chai.expect;
describe('MyPassport', () => {
    it('should have registered the local strategy', () => {
        expect(passport_1.passportInit.init(express())).to.equal('success');
    });
});
