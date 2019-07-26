
import { AuthProps } from "./auth/vo/fgp.auth.props";
import { AuthOperator } from "./auth/auth.operator";
import { KeycloakPromise } from "keycloak-js";
import { Auth } from "./auth/auth";
import { AuthFactory, AuthCallback } from "./auth/auth.factory";
import { Auths } from "./auth/auth.types";



let op:AuthOperator;

const callbackFnc: AuthCallback = (token: string, operator:AuthOperator) => {
    let infoDom = document.createElement("h1");
    infoDom.innerHTML = token;
    document.body.append(infoDom);
    console.debug(operator);
    op = operator;
};

let props: AuthProps = new AuthProps('fgp-auth-kc', {
    "realm": "fgp",
    "auth-server-url": "https://fgp-auth.auth.10.1.14.69.xip.io/auth",
    "ssl-required": "external",
    "resource": "office",
    "credentials": {
        "secret": "d5858af9-27d9-4aa8-a62f-273abea43a00"
    },
    "confidential-port": 0,
    "clientId": "office"
}, callbackFnc, ()=>{
    
});

let fgpAuth: Auth = new AuthFactory(Auths.KC, props).getAuth();

fgpAuth.init();


var userInfoBtn = document.getElementById('userinfo');

if(userInfoBtn){
    userInfoBtn.onclick = () =>{
        let resultP:KeycloakPromise<{}, void> = op.getUserInfo();
        //
        resultP.success((info)=>{
            console.info(info);
        });
    }
}


var logoutBtn = document.getElementById('logout');

if(logoutBtn){
    logoutBtn.onclick = () =>{
        //
        op.logout();
    }
}



