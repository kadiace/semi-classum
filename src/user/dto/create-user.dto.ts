export class CreateUserDto {
    email: string;
    lastname: string;
    firstname: string;
    profile: string;

    constructor(email: string, lastname: string, firstname: string, profile: string) {
        this.email = email
        this.lastname = lastname;
        this.firstname = firstname;
        this.profile = profile;
    }
}
