import { IsNumber, IsString, IsOptional, Length } from "class-validator";

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
    readonly latitude: number;

    @IsNumber()
    readonly altitude: number;

    @IsNumber()
    readonly rooms: number;

    @IsNumber()
    readonly bathrooms: number;

    @IsNumber()
    readonly area: number;

    @IsNumber()
    readonly cost_per_night: number;

    @IsNumber()
    @IsOptional()
    readonly max_people: number;

    @IsString()
    readonly description: string;

    @IsString()
    @IsOptional()
    @Length(3, 50)
    readonly slug: string;

    
    @IsString()
    @IsOptional()
    image?: string;
}