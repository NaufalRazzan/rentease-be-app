import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { NewUserDto } from "./new-user.dto";
import { OmitType, PartialType } from "@nestjs/mapped-types"

export class UpdateProfileDto extends PartialType(OmitType(NewUserDto, ['password'] as const)){
    @IsNotEmpty({ message: 'nik field cannot be empty' })
    @IsString({ message: 'nik field must be a valid string' })
    @IsOptional()
    nik?: string

    @IsNotEmpty({ message: 'no_hp field cannot be empty' })
    @IsString({ message: 'no_hp field must be a valid string' })
    @IsOptional()
    no_hp?: string

    @IsNotEmpty({ message: 'alamat field cannot be empty' })
    @IsString({ message: 'alamat field must be a valid string' })
    @IsOptional()
    alamat?: string
}