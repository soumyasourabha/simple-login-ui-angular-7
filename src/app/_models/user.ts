export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    ip: String;
    roles: Array<String>;
    logInDtm : Date ;
    logOutDtm : Date ;
    logInRole : String ;
}