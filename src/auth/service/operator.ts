import { AuthOperator } from "../interfaces/auth.operator";
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


    refreshToken(): string {

        return "";
    }

}