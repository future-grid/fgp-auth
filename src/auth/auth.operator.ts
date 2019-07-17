export interface AuthOperator{
    logout(): void;
    getUserInfo(): any;
    refreshToken(): any;
    getAuth(): any;
}