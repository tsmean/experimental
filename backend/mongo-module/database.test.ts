import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import {database} from './database';
import {setupTests} from './testsetup';

chai.use(chaiHttp);
const expect = chai.expect;


describe('Connect Test', () => {

  setupTests.connectTestToDatabase();

  it('should be able to write to db', function(done) {

    const item = {
      text: 'Hello World'
    };

    expect(database.database !== undefined).to.be.true;
    database.database.collection('notes').insertOne(item, function(err, result) {
      expect(err).to.equal(null);
      expect(result.insertedCount).to.equal(1);
      done();
    });

  });

});
