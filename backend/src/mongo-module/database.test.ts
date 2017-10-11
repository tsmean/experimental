import {MongoConnector} from './database';
import {setupTests} from './testsetup';

describe('Connect Test', () => {

  setupTests.connectTestToDatabase();

  it('should be able to write to db', function(done) {

    const item = {
      text: 'Hello World'
    };

    const connector = new MongoConnector();

    expect(connector.database !== undefined).toBe(true);
    connector.database.database.collection('notes').insertOne(item, function(err, result) {
      expect(err).toEqual(null);
      expect(result.insertedCount).toEqual(1);
      done();
    });

  });

});
