import { PropertyType } from '../../enums/propertyType.enum';
import { PaymentMethod } from 'src/enums/paymentMethod.enum';

export class Booking {
    id: string;
    check_in: Date;
    check_out: Date;
    property_type: PropertyType;
    property_id: string;
    user_id: string;
    num_people: number;
    payment_method: PaymentMethod; 
    is_paid: boolean; 
    is_confirmed: boolean; 
}
