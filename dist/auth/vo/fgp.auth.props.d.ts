import { AuthCallback } from "../auth.factory";
export declare class AuthProps {
    name: string;
    initOpts: any;
    callback: AuthCallback;
    errorCallback: any;
    constructor(name: string, initOpts: any, callback: AuthCallback, errorCallback: any);
}
