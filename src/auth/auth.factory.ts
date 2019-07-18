import { Auth } from "./auth";
import { AuthProps } from "./vo/fgp.auth.props";
import { KeycloakAuth } from "./impls/keycloak.auth";
import { Auths } from './auth.types';

export type AuthCallback = (token: string, operator: any) => any;

export class AuthFactory {

    private auth: Auth;

    constructor(type: string, props: AuthProps) {
        if (type === Auths.KC && props) {
            this.auth = new KeycloakAuth(props);
        } else if (type === Auths.Auth0 && props) {
            console.warn("not implement yet!");
        } else {
            console.error("auth type not found!", type);
        }
    }

    /**
     *  get auth object
     */
    getAuth(): Auth {
        return this.auth;
    }
}

export function createInstance(type: string, props: AuthProps) {
    return new AuthFactory(type, props);
}