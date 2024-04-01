import { IsEnum, IsDate, IsString, IsNumber, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { PropertyType } from 'src/enums/propertyType.enum';
import { PaymentMethod } from 'src/enums/paymentMethod.enum';


export class CreateBookingDto {
  @IsDate()
  readonly check_in: Date;

  @IsDate()
  readonly check_out: Date;

  @IsEnum(PropertyType)
  readonly property_type: PropertyType;

  @IsString()
  readonly property_id: string; 

  @IsUUID()
  readonly userId: string; 

  @IsNumber()
  readonly num_people: number;

  @IsEnum(PaymentMethod)
  readonly payment_method: PaymentMethod;

  @IsBoolean()
  @IsOptional() 
  readonly is_paid?: boolean;

  @IsBoolean()
  @IsOptional() 
  readonly is_confirmed?: boolean;
}
