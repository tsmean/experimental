import {MongoConnector} from './database';

export namespace setupTests {

  export async function connectTestToDatabase() {
    const connector = new MongoConnector();
    return beforeEach(async (done) => {
      connector.connectToDatabase(getConfig(), (db) => {
        db.dropDatabase().then(() => {
          done();
        });
      });
    });
  }

  export function getConfig() {
    return require('../../properties/test.properties.json').db;
  };

}
