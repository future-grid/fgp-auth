import { AuthOperator } from "../auth.operator";
import { KeycloakPromise } from "keycloak-js";

export class KCAuthOperator implements AuthOperator {

    private authObj: Keycloak.KeycloakInstance;

    constructor(authObj: Keycloak.KeycloakInstance) {
        this.authObj = authObj;
    }

    logout(): void {
        this.authObj.logout();
    }

    getUserInfo(): KeycloakPromise<{}, void> {
        return this.authObj.loadUserInfo();
    }


    refreshToken(): KeycloakPromise<boolean, boolean> {
        return this.authObj.updateToken(70);
    }

    getAuth() :Keycloak.KeycloakInstance{
        return this.authObj;
    }

}