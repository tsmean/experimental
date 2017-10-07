"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const app_config_1 = require("./app-config");
const expect = chai.expect;
describe('AppConfig', () => {
    it('should be able to set & get config', () => {
        app_config_1.appConfig.setAppConfig('test');
        expect(typeof app_config_1.appConfig.appConfig).to.equal('object');
    });
});
