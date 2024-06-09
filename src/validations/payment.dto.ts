import { IsNotEmpty, IsNotEmptyObject, IsNumber, IsString } from "class-validator"

export class CardInfoDTO{
    @IsNotEmpty({ message: 'card_num field cannot be empty' })
    @IsString({ message: 'card_num field must be a valid string' })
    card_num: string

    @IsNotEmpty({ message: 'card_holder_name field cannot be empty' })
    @IsString({ message: 'card_holder_name field must be a valid string' })
    card_holder_name: string

    @IsNotEmpty({ message: 'expr_date field cannot be empty' })
    @IsString({ message: 'expr_date field must be a valid string' })
    expr_date: string
}

export class DriverCardDTO{
    @IsNotEmpty({ message: 'full_name field cannot be empty' })
    @IsString({ message: 'full_name field must be a valid string' })
    full_name: string

    @IsNotEmpty({ message: 'contact_num field cannot be empty' })
    @IsString({ message: 'contact_num field must be a valid string' })
    contact_num: string

    @IsNotEmpty({ message: 'country field cannot be empty' })
    @IsString({ message: 'country field must be a valid string' })
    country: string

    @IsNotEmpty({ message: 'city field cannot be empty' })
    @IsString({ message: 'city field must be a valid string' })
    city: string

    @IsNotEmpty({ message: 'postCode field cannot be empty' })
    @IsString({ message: 'postCode field must be a valid string' })
    postCode: string
}

export class PaymentDTO{
    @IsNotEmpty({ message: 'pickUp_date field cannot be empty' })
    pickUp_date: Date

    @IsNotEmpty({ message: 'dropOff_date field cannot be empty' })
    dropOff_date: Date

    @IsNotEmpty({ message: 'total_amount field cannot be empty' })
    @IsNumber({}, { message: 'total_amount field must be a valid number' })
    total_amount: number

    @IsNotEmptyObject({ nullable: false }, { message: 'card_info object cannot be empty' })
    card_info: CardInfoDTO

    @IsNotEmptyObject({ nullable: false }, { message: 'driver_card object cannot be empty' })
    driver_card: DriverCardDTO
}