import { Auths } from "./auth/auth.types";
import { AuthFactory } from "./auth/auth.factory";
import { AuthProps } from "./auth/vo/fgp.auth.props";
import { KeycloakAuth } from "./auth/impls/keycloak.auth";
import { Auth } from "./auth/auth";
import { AuthOperator } from "./auth/auth.operator";
import { KCAuthOperator } from "./auth/service/operator";

import Keycloak, { KeycloakInstance, KeycloakPromise, KeycloakPromiseCallback, KeycloakError } from 'keycloak-js';

// keycloak testing
describe('FGP-AUTH testing', () => {


    describe('Auth Types', () => {
        test("Auth types must be keycloak or auth0", () => {
            expect(Auths.KC).toBe('keycloak');
            expect(Auths.Auth0).toEqual("auth0");
        });
    });

    describe('Keycloak Implementation', () => {

        let ap: AuthProps;
        let kcMock: KeycloakInstance;
        let op: AuthOperator;
        beforeEach(() => {
            ap = new AuthProps("test", {}, () => { }, () => { });
            // mock a keycloak instance , , , , 
            const MockKc = jest.fn(() => ({
                init: jest.fn(),
                login: jest.fn(),
                logout: jest.fn().mockImplementation(() => {
                    return true;
                }),
                register: jest.fn(),
                createLoginUrl: jest.fn(),
                createLogoutUrl: jest.fn(),
                createRegisterUrl: jest.fn(),
                accountManagement: jest.fn(),
                createAccountUrl: jest.fn(),
                isTokenExpired: jest.fn(),
                updateToken: jest.fn(),
                clearToken: jest.fn(),
                hasRealmRole: jest.fn(),
                hasResourceRole: jest.fn(),
                loadUserProfile: jest.fn(),
                loadUserInfo: jest.fn().mockImplementation(() => {
                    return {
                        name: "Eric"
                    };
                })
            }));
            kcMock = new MockKc();
            op = new KCAuthOperator(kcMock);
        });


        test("Create Keycloak auth via facotry", () => {
            const af: AuthFactory = new AuthFactory(Auths.KC, ap);
            expect(af.getAuth()).toBeInstanceOf(KeycloakAuth);
        });

        describe('operations', () => {
            test("auth object must match", () => {
                expect(op.getAuth()).toMatchObject(kcMock);
            });

            test("user's name is Eric", () => {
                let userInfo = op.getUserInfo();
                expect(userInfo.name).toEqual("Eric");
            });

            test("logout method called", () => {
                op.logout();
                expect(kcMock.logout).toHaveBeenCalled();
            });
        });
    });
});




