import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserChangePasswordDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    token: string;
}