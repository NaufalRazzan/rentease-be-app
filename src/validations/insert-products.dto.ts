import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class InsertProductsDto {
    @IsNotEmpty({ message: 'name cannot be empty' })
    @IsString({ message: 'name must be a valid string' })
    vehicleName: string

    @IsNotEmpty({ message: 'location cannot be empty' })
    @IsString({ message: 'location must be a valid string' })
    location: string

    @IsNotEmpty({ message: 'rent cost cannot be empty' })
    @IsNumber({}, { message: 'rent cost only accept numbers' })
    rent_cost: number

    @IsNotEmpty({ message: 'category cannot be empty' })
    @IsEnum(['Motor', 'Moge', 'Mobil', 'Supercar', 'Sepeda'], { message: 'only accept either Motor, Moge, Mobil, Supercar, or sepeda' })
    category: string

    @IsOptional()
    img_path: string

    @IsNotEmpty({ message: 'transmission cannot be empty' })
    @IsEnum(['Automatic', 'Manual', 'N/A'])
    transmission: string

    @IsNotEmpty({ message: 'seats_num cannot be empty' })
    @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'seats_num must be a number type' })
    seats_num: number

    @IsNotEmpty({ message: 'power cannot be empty' })
    @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'power must be a number type' })
    power: number
}