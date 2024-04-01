
import { IsNumber, IsString, IsDate, IsBoolean } from "class-validator";
import { IsPropertyType } from "src/pipes/isPropertyType.pipe";

export class CreateBookingDto {
    @IsString()
    readonly booking_id: string;

    @IsDate()
    readonly check_in: Date;

    @IsDate()
    readonly check_out: Date;

    @IsString()
    readonly property_type: string;

    @IsString()
    readonly property_id: string

    @IsString()
    readonly id: string;

    @IsString()
    readonly name: string;

    @IsString()
    readonly last_name: string;

    @IsString()
    readonly email: string;

    @IsString()
    readonly phone_number: string;

    @IsString()
    readonly address: string;

    @IsNumber()
    readonly num_people: number;

    @IsNumber()
    readonly payment_method: number;

    @IsBoolean()
    readonly is_paid: boolean;  

    @IsBoolean()
    readonly is_confirmed: boolean; 

   

}