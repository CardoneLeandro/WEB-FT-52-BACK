import { IsNotEmpty, IsString } from "class-validator";

export class CompleteRegisterAuth0Dto {

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    // @IsNotEmpty()
    // @IsString()
    // confirmPassword: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    phone: string;
}