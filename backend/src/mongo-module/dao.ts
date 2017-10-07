import * as mongo from 'mongodb';
import {database} from './database';
import {
  CreateResponse, DatabaseError, DatabaseResponse, ReadResponse, UpdateResponse
} from '../dbadapter-module';
import {Cursor, MongoCallback, MongoClient, MongoError} from 'mongodb';
import {DAO} from '../dbadapter-module/dao.model';

// Database Access Object
// Everything that operates directly on the database goes here
// i.e. everything that has to do anything with mongodb
// goal is to abstract away MongoDB stuff and localize in one place, so if you want to swap e.g. for a relational DB
// it's not too much effort

// also, don't expose Mongo API directly, but program against an interface (DatabaseResponse)

class MongoDAO implements DAO {

  public read(id, tableName: string, cb: (dbResponse: DatabaseResponse<any>) => void): void {
    database.database.collection(tableName, (err, collection) => {

      if (err) {
        cb({
          error: err
        });
      } else {

        collection.findOne({'_id': new mongo.ObjectID(id)}, (innerError, data) => {

          if (innerError) {
            cb({
              error: innerError
            });
          } else {
            if (data) {
              cb({
                error: null,
                data: this.morphDataOnRetrieval(data)
              });
            } else {
              cb({
                error: {
                  message: 'not found'
                }
              });
            }
          }
        });

      }

    });
  }

  public readAll(collectionName: string, cb: (dbResponse: DatabaseResponse<any>) => void): void {
    database.database.collection(collectionName, (err, collection) => {

      if (err) {
        cb({
          error: err
        });
      } else {

        collection.find({}, (innerError, cursor) => {

          if (innerError) {
            cb({
              error: innerError
            });
          } else {
            if (cursor) {
              cursor.toArray().then(ary => {
                cb({
                  error: null,
                  data: this.morphDataOnRetrieval(ary)
                });
              });

            } else {
              cb({
                error: {
                  message: 'not found'
                }
              });
            }
          }
        });

      }

    });
  }

  public readOneByField(
    fieldName: string,
    fieldValue: any,
    tableName: string,
    cb: (dbResponse: DatabaseResponse<any>) => void): void {
    database.database.collection(tableName, (err, collection) => {

      if (err) {
        cb({
          error: err
        });
      } else {

        const searchObject = {};
        searchObject[fieldName] = fieldValue;

        collection.findOne(searchObject, (innerError, data) => {
          if (innerError) {
            cb({
              error: innerError
            });
          } else {
            if (data) {
              cb({
                error: null,
                data: this.morphDataOnRetrieval(data)
              });
            } else {
              cb({
                error: {
                  message: 'not found'
                }
              });
            }
          }
        });
      }

    });
  }

  public create(item: Object, collectionName: string,
                cb: (dbResp: DatabaseResponse<CreateResponse>) => void): void {

    // deep copy object so input doesn't get mutated
    const itemCopy = JSON.parse(JSON.stringify(item));

    database.database.collection(collectionName, (err: MongoError, collection) => {
      if (err) {
        cb({
          error: this.mongoErrorToGeneralDbError(err)
        });
      } else {
        collection.insertOne(itemCopy, (innerError: MongoError, result) => {
          if (innerError) {
            cb({
              error: this.mongoErrorToGeneralDbError(innerError)
            });
          } else {
            cb({
              error: null,
              data: this.morphDataOnRetrieval(itemCopy)
            });
          }
        });
      }
    });
  }

  public update(item, collectionName: string, cb: (dbResp: DatabaseResponse<UpdateResponse>) => void): void {

    // deep copy object so input doesn't get mutated and morph it to correct storage form
    const itemCopy = this.morphDataOnStorage(item);

    database.database.collection(collectionName, (err, collection) => {
      if (err) {
        cb({
          error: this.mongoErrorToGeneralDbError(err)
        });
      } else {
        collection.updateOne({'_id': new mongo.ObjectID(itemCopy._id)}, item, (innerError: MongoError, result) => {
          if (innerError) {
            cb({
              error: this.mongoErrorToGeneralDbError(innerError)
            });
          } else {
            cb({
              error: null,
              data: this.morphDataOnRetrieval(itemCopy)
            });
          }
        });
      }
    });
  }

  public remove(id: number | string, collectionName: string, cb: (dbResp: DatabaseResponse<any>) => void): void {
    database.database.collection(collectionName, (err, collection) => {
      if (err) {
        cb({
          error: this.mongoErrorToGeneralDbError(err)
        });
      } else {
        collection.deleteOne({'_id': new mongo.ObjectID(id)}, (innerError, result) => {
          if (innerError) {
            cb({
              error: this.mongoErrorToGeneralDbError(innerError)
            });
          } else {
            cb({
              error: null
            });
          }
        });
      }
    });
  }

  private mongoErrorToGeneralDbError (err: MongoError): DatabaseError {
    return {
      message: err.message
    };
  }


  private morphDataOnRetrieval(data, logme?: boolean) {

    if (!data) {
      console.error('No data!');
      return;
    }

    const dataCopy = JSON.parse(JSON.stringify(data));

    const morphResource = (resource): void => {
      if (typeof resource._id !== 'string') {
        resource.uid = resource._id.toHexString();
      } else {
        resource.uid = resource._id;
      }
      delete resource._id;
    };

    if (Array.isArray(dataCopy)) {
      dataCopy.forEach(resource => {
        morphResource(resource);
      });
    } else {
      morphResource(dataCopy);
    }

    return dataCopy;
  };

  private morphDataOnStorage(data) {
    const dataCopy = JSON.parse(JSON.stringify(data));
    dataCopy._id = data.uid;
    delete dataCopy.uid;
    return dataCopy;
  };


}
export const dao = new MongoDAO();
