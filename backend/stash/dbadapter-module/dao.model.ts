import {CreateResponse, DatabaseResponse, UpdateResponse} from './database.model';
export interface GenericCrudDao {

  read(id, tableName: string, cb: (dbResponse: DatabaseResponse<any>) => void): void;
  readAll(collectionName: string, cb: (dbResponse: DatabaseResponse<any>) => void): void;
  readOneByField(fieldName: string, fieldValue: any, tableName: string, cb: (dbResponse: DatabaseResponse<any>) => void): void;
  create(item: Object, collectionName: string, cb: (dbResp: DatabaseResponse<CreateResponse>) => void): void;
  update(item, collectionName: string, cb: (dbResp: DatabaseResponse<UpdateResponse>) => void): void;
  remove(id: number | string, collectionName: string, cb: (dbResp: DatabaseResponse<any>) => void): void;

}
