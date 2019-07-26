import Keycloak from "keycloak-js";
import { AuthProps } from "../vo/fgp.auth.props";
import { Auth } from "../auth";
export declare class KeycloakAuth implements Auth {
    foo: string;
    name: string;
    version: string;
    props: AuthProps;
    kc: Keycloak.KeycloakInstance;
    constructor(props: AuthProps);
    init(): void;
    updateState: () => void;
}
