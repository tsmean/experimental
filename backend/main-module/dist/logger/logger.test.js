"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const logger_1 = require("./logger");
const expect = chai.expect;
describe('Logger', () => {
    it('should be able to log', () => {
        logger_1.log.info('Hello');
        logger_1.log.warn('World.');
        logger_1.log.debug('You are');
        logger_1.log.error('nice.');
    });
});
