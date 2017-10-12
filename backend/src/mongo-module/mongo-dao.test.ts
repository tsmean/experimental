import {Test} from '@nestjs/testing';
import {MongoDAO} from './mongo-dao';
import {GenericCrudDao} from '../dbadapter-module/dao.model';
import {MongoConnector} from './mongo-connector';
import {DatabaseResponse, ReadResponse} from '../dbadapter-module/database.model';

describe('Mongo DAO', () => {

  let dao: GenericCrudDao;
  let connector: MongoConnector;

  beforeEach(async (done) => {

    const module = await Test.createTestingModule({
      components: [
        MongoConnector,
        MongoDAO
      ]
    }).compile();

    dao = module.get<MongoDAO>(MongoDAO);
    connector = module.get<MongoConnector>(MongoConnector);

    connector.connectToDatabase(require('../../properties/test.properties.json').db, (db) => {
      db.dropDatabase().then(() => {
        done();
      });
    });

  });

  it('should be able to insert, read, update, delete', function(done) {

    const item = {text: 'hello'};

    const doDelete = (id: string) => {
      dao.remove(id, 'items', (dbResponse: DatabaseResponse<any>) => {
        expect(dbResponse.error).toEqual(null);
        done();
      });
    };

    const doUpdate = (updateItem) => {
      updateItem.text = updateItem.text + ' world!';

      dao.update(updateItem, 'items', (dbResp) => {

        expect(dbResp.error).toEqual(null);

        const doReadTwo = (id: string) => {
          dao.read(id, 'items', (dbResp2) => {
            expect(dbResp2.error).toEqual(null);
            expect(dbResp2.data.text).toEqual('hello world!');
            doDelete(updateItem.uid);
          });
        };
        doReadTwo(updateItem.uid);

      });
    };

    const doRead = (uid: string) => {
      dao.read(uid, 'items', (dbResponse: DatabaseResponse<ReadResponse>) => {

        expect(dbResponse.error).toEqual(null);
        expect(dbResponse.data.text).toEqual('hello');
        expect(dbResponse.data.uid).not.toBe(undefined);
        expect(dbResponse.data.uid).not.toBe(null);

        doUpdate(dbResponse.data);

      });
    };


    const doCreate = () => {
      dao.create(item, 'items', (dbResp) => {
        expect(dbResp.error).toEqual(null);
        doRead(dbResp.data.uid);
      });
    };

    const start = () => {
      doCreate();
    };

    start();

  });

  it('should be able to readAll', function(done) {

    const item = {hello: 'world'};
    const item2 = {hello: 'world'};

    dao.create(item, 'items', (dbResp) => {
      dao.create(item, 'items', (dbResp2) => {
        dao.readAll('items', dbResp3 => {
          expect(dbResp3.error).toBe(null);
          expect(Array.isArray(dbResp3.data)).toBe(true);
          expect(dbResp3.data.length).toEqual(2);
          done();
        });
      });
    });

  });

});
