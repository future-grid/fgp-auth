# future-grid/fgp-auth

fgp-auth bases on keycloak & auth0 libs, uses typescript as dev language. It is the easy way to integrate token based auth. 

## Getting Started

install package via npm 
```
npm install --save @future-grid/fgp-auth
```

keycloak  

Add keycloak js file into "index.html". This js comes from keycloak http server.  
```
http(s)://<domain>/auth/js/keycloak.js
```

### Installing(React)

A step by step series of examples that tell you how to get a fgp-auth working with keycloak and react ui project

* create keycloak config json and import it into App.js(the root component)

```json
{
        "realm": "fgp-ue",  // realm name in cloak
        "auth-server-url": "http://10.153.154.40:32405/auth",  // auth server. replace with keycloak dns
        "ssl-required": "external",
        "redirect_uri": 'http://localhost:3000',       // redirect url. replace with ui dns
        "resource": "ue-ui",
        "credentials": {
          "secret": "35570e3c-54d0-44d1-936b-ea681bc4f5a9" // secret in cloak 
        },
        "confidential-port": 0,
        "clientId": "ue-ui"   // client id in keycloak
      }
```
then import it into root component(App.js)
```javascript
import AuthConfig from './configs/authConfig.json';
```

* create success and failed callback 
```javascript
/**
* after login successful fgp-auth will call this method to send token back.
**/
const successCallback = (token, operator) => {
         
        localStorage.setItem("accessToken", token);
        operator.getUserInfo().success((info) => {
          this.setState({
            auth: {
              "accessToken": token,
              "op": operator,
              "user": info
            }
          });
          
        }).error(() => {
          // redirect to login page
          this.state.auth.op.logout();
        });

        this.setState({
            auth: true
        })
      };
/**
* error then logout
**/
const errorCallback = () => {
        // when error happened, that's mean auth failed!
        this.state.auth.op.logout();
      };
``` 

* create auth operator instancer
```javascript
// AuthConfig imported from a json file or just replace this var with a json object
const auth = new AuthFactory(Auths.KC, new AuthProps('fgp-auth-kc', AuthConfig, callbackFnc, errorCallback))

// call getAuth()  send auth request to keycloak server

auth.getAuth()

```

After login successful keycloak will send a token back then you need to add authorization header of all your ajax requests.  
ex. interceptor
```javascript
componentWillMount(){
        axios.interceptors.request.use(
            config => {
              if (!config.headers.Authorization) {
                const token = localStorage.getItem("accessToken");
                if (token) {
                  config.headers.Authorization = `Bearer ${token}`;
                }
              }
              return config;
            },
            error => Promise.reject(error)
          );
    }
```

## Secured API (optional)

security fgp api server with parameters

* auth_type: open_id
* secret: <rsa public key> get it from keycloak
* appid: <client_id> get if from keycloak
* trusted_issuer: <url of keycloak with realm> https://<domain>/auth/realms/<realm>

## Built With

* [Webpack](https://webpack.js.org/concepts/) - Static module bundler for modern JavaScript applications
* [Keycloak](https://www.keycloak.org/documentation.html) - Dependency lib
* [Typescript](https://www.typescriptlang.org/docs/home.html) - Coding language

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](git+https://github.com/future-grid/fgp-auth.git). 

## Authors

* **Eric Wang** - *Initial work & Development*

See also the list of [contributors](https://github.com/future-grid/fgp-auth/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
