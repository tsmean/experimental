import { CreateResponse, DatabaseResponse, UpdateResponse } from '../dbadapter-module';
export declare namespace dao {
    function read(id: any, tableName: string, cb: (dbResponse: DatabaseResponse<any>) => void): void;
    function readAll(collectionName: string, cb: (dbResponse: DatabaseResponse<any>) => void): void;
    function readOneByField(fieldName: string, fieldValue: any, tableName: string, cb: (dbResponse: DatabaseResponse<any>) => void): void;
    function create(item: Object, collectionName: string, cb: (dbResp: DatabaseResponse<CreateResponse>) => void): void;
    function update(item: any, collectionName: string, cb: (dbResp: DatabaseResponse<UpdateResponse>) => void): void;
    function remove(id: number | string, collectionName: string, cb: (dbResp: DatabaseResponse<any>) => void): void;
}
