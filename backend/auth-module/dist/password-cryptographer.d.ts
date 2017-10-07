export declare namespace passwordCryptographer {
    function doHash(plaintextPassword: string): Promise<string>;
    function doCompare(plaintextPassword: any, hash: any): Promise<boolean>;
}
