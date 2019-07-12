import { AuthProps } from "./vo/fgp.auth.props";

import Keycloak from '../../node_modules/keycloak-js/dist/keycloak';
import { KCAuthOperator } from "./service/operator";


export type authCallback = (token:string, operator:any) => any;

export class KeycloakAuth {

    foo: string;

    name: string;

    version: string = '1.0.0';

    props: AuthProps;

    kc: Keycloak.KeycloakInstance;

    constructor(props: AuthProps) {
        this.foo = 'fgp';
        this.name = props.name;
        this.props = props;
        this.kc = Keycloak(props.initOpts);
    }

    init() {
        const { initOpts } = this.props;
        // all events
        this.kc.onAuthSuccess = this.updateState;

        // init keycloak
        this.kc.init({ ...initOpts }).success(async authenticated => {
            console.debug(authenticated);
            if (!authenticated) {
                this.kc.login();
            } else {
                const { token, tokenParsed, refreshToken, refreshTokenParsed } = this.kc;
                console.debug(tokenParsed, refreshTokenParsed);
            }
        }).error(error => {
            console.error(error);
        });

    }

    updateState = () => {
        //
        const { callback } = this.props;
        const { token, refreshToken } = this.kc;
        
        callback && token && callback(token, new KCAuthOperator(this.kc));
    }





}