export interface User {
    uid?: string;
    email: string;
    password?: {
        hash: string;
        algorithm: HashingAlgorithm;
    };
}
export declare type HashingAlgorithm = 'bcrypt';
