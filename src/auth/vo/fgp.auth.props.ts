import { AuthCallback } from "../auth.factory";


export class AuthProps {
    constructor(public name: string, public initOpts: any, public callback: AuthCallback, public errorCallback: any) { }
}