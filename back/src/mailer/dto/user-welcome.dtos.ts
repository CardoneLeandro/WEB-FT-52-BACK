import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserWelcomeDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}