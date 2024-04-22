import { Property } from 'src/property/entities/property.entity';
import { Location } from '../../aux_entities/location.entity';
import { PropertyType } from '../../enums/propertyType.enum';
export class Booking {
    id: string;
    check_in: Date;
    check_out: Date;
    property_type: PropertyType;
    property: Property;
    user_id: string;
    num_people: number;
    payment_method: string; 
    is_paid: boolean; 
    is_confirmed: boolean; 
    cost_per_night: number;
}
