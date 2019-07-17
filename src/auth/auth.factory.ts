import { Auth } from "./auth";
import { AuthProps } from "./vo/fgp.auth.props";
import { KeycloakAuth } from "./impls/keycloak.auth";
import { Auths }  from './auth.types';

export type AuthCallback = (token:string, operator:any) => any;

export class AuthFactory {

    private auth: Auth;

    constructor(type: string, props: AuthProps) {
        if (type === Auths.KC && props) {
            this.auth = new KeycloakAuth(props);
        } else {
            this.auth = {
                init: () => {
                    // not support
                },
                updateState: () => {
                    // not support
                }
            };
        }
    }

    getAuth() {
        return this.auth;
    }
}

export function createInstance(type: string, props: AuthProps) {
    return new AuthFactory(type, props);
}