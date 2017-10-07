import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import {setupTests} from './testsetup';

chai.use(chaiHttp);
const expect = chai.expect;


describe('Connect Test', () => {

  setupTests.connectTestToDatabase();

  it('should be able to execute before eachs', function(done) {
    done();
  });

});
