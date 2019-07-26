import { Auth } from "./auth";
import { AuthProps } from "./vo/fgp.auth.props";
export declare type AuthCallback = (token: string, operator: any) => any;
export declare class AuthFactory {
    private auth;
    constructor(type: string, props: AuthProps);
    /**
     *  get auth object
     */
    getAuth(): Auth;
}
export declare function createInstance(type: string, props: AuthProps): AuthFactory;
