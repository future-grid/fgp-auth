export interface AuthOperator{
    logout(): void;

    getUserInfo(): any;


    refreshToken(): string;
}