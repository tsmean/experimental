import * as mocha from 'mocha';
import * as chai from 'chai';
import * as express from 'express';
import {PassportInit} from './passport';
import {dao} from '../mongo-module/dao';
import {passwordCryptographer} from './password-cryptographer';

const expect = chai.expect;

describe('MyPassport', () => {

  it('should have registered the local strategy', () => {

    const passportInit = new PassportInit(dao, passwordCryptographer);

    expect(passportInit.init(express())).to.equal('success');
  });

});
