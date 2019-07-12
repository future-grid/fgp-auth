import { authCallback } from "../kecloak.auth";

export class AuthProps {
    constructor(public name: string, public initOpts: any, public callback: authCallback) { }
}