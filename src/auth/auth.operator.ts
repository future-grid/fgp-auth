export interface AuthOperator{
    /**
     * logout
     */
    logout(): void;
    /**
     * get user info 
     */
    getUserInfo(): any;
    /**
     * refreshToken (get new access token)
     */
    refreshToken(): any;

    /**
     * get auth object
     */
    getAuth(): any;
}