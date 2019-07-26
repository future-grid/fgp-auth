import { AuthOperator } from "../auth.operator";
import { KeycloakPromise } from "keycloak-js";
export declare class KCAuthOperator implements AuthOperator {
    private authObj;
    constructor(authObj: Keycloak.KeycloakInstance);
    logout(): void;
    getUserInfo(): KeycloakPromise<{}, void>;
    refreshToken(): KeycloakPromise<boolean, boolean>;
    getAuth(): Keycloak.KeycloakInstance;
}
