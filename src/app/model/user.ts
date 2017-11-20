import { Role } from './role';

export class User {
    public id: Number;
    public email: String = '';
    public username: String = '';
    public password: String = '';
    public firstName: String = '';
    public lastName: String = '';
    public roles: Role[];
}
