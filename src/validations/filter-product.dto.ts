import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from "class-validator"

export class FilterProductDto{
    @IsString({ message: 'vehicle name must be a valid string' })
    @IsOptional()
    vehicle_name: string

    @IsString({ message: 'vehicle type must be a valid string' })
    @IsEnum(['Motor', 'Moge', 'Mobil', 'Supercar', 'Sepeda'], { message: 'only accept either Motor, Moge, Mobil, Supercar, or sepeda' })
    @IsOptional()
    category: string

    @IsString({ message: 'sort must be a valid string' })
    @IsEnum(['asc', 'desc', 'none'], { message: 'only contain either asc, desc, or none' })
    @IsOptional()
    sort: string

    @IsArray({ message: 'brandName must be a type of array' })
    @IsOptional()
    brandName: string[]

    @IsArray({ message: 'transmission must be a type of array' })
    @IsOptional()
    transmission: string[]

    @IsArray({ message: 'seatsNum must be a type of array' })
    @IsOptional()
    seatsNum: number[]

    @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'must be a valid type of numbers' })
    @IsOptional()
    minPrice: number

    @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'must be a valid type of numbers' })
    @IsOptional()
    maxPrice: number

    @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'must be a valid type of numbers' })
    @IsOptional()
    minPower: number

    @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'must be a valid type of numbers' })
    @IsOptional()
    maxPower: number

    @IsArray({ message: 'location must be a type of array' })
    @IsOptional()
    location: string[]
}