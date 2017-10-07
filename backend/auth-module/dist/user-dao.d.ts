import { User } from './user.model';
import { CreateResponse, DatabaseResponse, ReadResponse } from '@tsmean/dbadapter';
export declare namespace userDAO {
    function create(user: User, password: string, cb: (dbResponse: DatabaseResponse<CreateResponse>) => void): void;
    function getByMail(email: string, cb: (dbResponse: DatabaseResponse<ReadResponse>) => void): void;
    function getById(id: string, cb: (dbResponse: DatabaseResponse<ReadResponse>) => void): void;
}
