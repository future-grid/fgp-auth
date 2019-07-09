
import Keycloak from 'keycloak-js';


export default class FgpAuth {
    constructor() {
        this.foo = 'fgp';
        this.NAME = "futuregrid-auth";
        this.VERSION = "1.0.0";
    }

    init(mode, config) {
        let authObj = null;
        switch (mode) {
            case 'keycloak':
                authObj = new Keycloak(config);
                // check local storage first    
                let accessToken = localStorage.getItem('access_token');
                let refreshToken = localStorage.getItem('refresh_token');

                if (accessToken && refreshToken) {
                    // put old token into config
                    config.token = accessToken;
                    config.refreshToken = refreshToken;
                }

                // default skew
                authObj.timeSkew = 0;

                // show login page(dialog)
                authObj.show = authObj.login;

                // logout
                authObj.exit = (options) => {
                    this.logout({
                        redirectUri: options.returnTo
                    });
                };

                authObj.init(config).success((authed) => {
                    if (authed) {
                        localStorage.setItem('access_token', authObj.token);
                        localStorage.setItem('refresh_token', authObj.refreshToken);
                        // try to get user info
                        authObj.loadUserInfo().success(function (userInfo) {
                            localStorage.setItem('userInfo', userInfo.name);
                        }).error(function () {
                            console.error('Failed to load user info');
                        });
                    }
                }).error(() => {
                    console.error("Failed to initalized!");
                });

                break;
            case 'auth0':

                break;
            default:
                break;
        }

        return authObj;
    }
}


