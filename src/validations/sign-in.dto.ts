import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto{
    @IsNotEmpty({ message: 'email cannot be empty' })
    @IsEmail({}, { message: `'email' must be type of valid email` })
    email: string

    @IsNotEmpty({ message: 'password cannot be empty' })
    @IsString({ message: `'password' must be type of valid string` })
    password: string
}