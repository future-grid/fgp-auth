import Keycloak from "keycloak-js";
import { AuthProps } from "../vo/fgp.auth.props";
import { KCAuthOperator } from "../service/operator";
import { Auth } from "../auth";

export class KeycloakAuth implements Auth {
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
        const { initOpts, errorCallback } = this.props;
        // all events
        this.kc.onAuthSuccess = this.updateState;

        // init keycloak
        this.kc.init({ ...initOpts }).success(authenticated => {
            // console.debug(authenticated);
            if (!authenticated) {
                this.kc.login();
            } else {
                const { token, tokenParsed, refreshToken, refreshTokenParsed } = this.kc;
                // console.debug(tokenParsed, refreshTokenParsed);
            }
        }).error(error => {
            console.error(error);
            errorCallback();
        });

    }

    updateState = () => {
        //
        const { callback, errorCallback } = this.props;
        const { token } = this.kc;
        
        const kco = new KCAuthOperator(this.kc);

        callback && token && callback(token, kco);

        setInterval(() => {
            kco.refreshToken().success((refreshed) => {
                // 
                if(refreshed){
                    const { token } = this.kc;
                    console.info("fetch new token success!");
                    // call  callback to update token
                    callback && token && callback(token, kco);
                }else{
                    console.warn('Token not refreshed, valid for '
                            + Math.round(kco.getAuth().tokenParsed.exp + kco.getAuth().timeSkew - new Date().getTime() / 1000) + ' seconds');
                }
            }).error(() =>{
                console.error("token refresh failed!");
                errorCallback && errorCallback();
            });
        }, 30000);
    }

}