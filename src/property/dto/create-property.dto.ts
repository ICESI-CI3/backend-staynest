import { IsNumber, IsString } from "class-validator";

export class CreatePropertyDto {
    @IsString()
    readonly type: string;

    @IsString()
    readonly country: string;

    @IsString()
    readonly city: string;

    @IsString()
    readonly address: string;

    @IsNumber()
    readonly rooms: number;

    @IsNumber()
    readonly bathrooms: number;

    @IsNumber()
    readonly area: number;

    @IsNumber()
    readonly cost_per_night: number;

    @IsNumber()
    readonly max_people: number;
}
