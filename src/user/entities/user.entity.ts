import { Role } from "src/enums/role.enum";

export class User {
    id: string;
    password: string;
    email: string;
    name: string;
    role: Role;
}
