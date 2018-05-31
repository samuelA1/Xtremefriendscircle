export class User {
    public firstName : string
    public lastName : string
    public email : string
    public password : string

    constructor(firstName?, lastName?, email?, password?) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}