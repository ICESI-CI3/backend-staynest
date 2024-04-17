import { IsEmail, IsString } from "class-validator";
import { Role } from "src/enums/role.enum";

export class CreateUserDto {

    @IsString()
    @IsEmail()
    readonly email: string;

    @IsString()
    readonly password: string;

    @IsString()
    readonly name: string;

    @IsString()
    readonly role: Role;

}
