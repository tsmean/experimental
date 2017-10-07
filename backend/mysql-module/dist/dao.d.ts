import { CreateResponse, DatabaseResponse, UpdateResponse } from '@tsmean/dbadapter';
export declare namespace dao {
    function read(id: any, tableName: string, cb: (dbResponse: DatabaseResponse<any>) => void): void;
    function readAll(tableName: string, cb: (dbResponse: DatabaseResponse<any>) => void): void;
    function readOneByField(fieldName: string, fieldValue: any, tableName: string, cb: (dbResponse: DatabaseResponse<any>) => void): void;
    function create(item: Object, tableName: string, cb: (dbResp: DatabaseResponse<CreateResponse>) => void): void;
    function update(item: any, tableName: string, cb: (dbResp: DatabaseResponse<UpdateResponse>) => void): void;
    function remove(id: any, tableName: string, cb: (dbResp: DatabaseResponse<any>) => void): void;
}
