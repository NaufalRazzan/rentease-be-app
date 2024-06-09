import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Matches } from "class-validator"

export class NewUserDto{
    @IsNotEmpty({ message: 'username field cannot be empty' })
    @IsString({ message: 'username field must be a valid string' })
    // @Matches(/^\S*$/, { message: 'username cannot contain any whitespace' })
    nama_lengkap: string

    @IsNotEmpty({ message: 'email field cannot be empty' })
    @IsEmail({}, { message: 'email field must be a type of valid email' })
    email: string

    @IsNotEmpty({ message: 'password field cannot be empty' })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
      }, { message: 'weak password' })
    password: string
}