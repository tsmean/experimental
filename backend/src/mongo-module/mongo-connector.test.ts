import {MongoConnector} from './mongo-connector';
import {Test} from '@nestjs/testing';

describe('Connect Test', () => {

  let connector: MongoConnector;

  beforeEach(async (done) => {
    const module = await Test.createTestingModule({
      components: [
        MongoConnector
      ]
    }).compile();

    connector = module.get<MongoConnector>(MongoConnector);

    await connector.connectToDatabasePromise(require('../../properties/test.properties.json').db);
    connector.database.dropDatabase().then(() => {
      done();
    });

  });


  it('should be able to write to db', function(done) {

    const item = {
      text: 'Hello World'
    };

    expect(!!connector.database).toBe(true);
    expect(!!connector.database.collection).toBe(true);
    connector.database.collection('notes').insertOne(item, function(err, result) {
      expect(err).toEqual(null);
      expect(result.insertedCount).toEqual(1);
      done();
    });

  });

});
