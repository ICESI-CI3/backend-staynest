import { Location } from '../../aux_entities/location.entity';
import { PropertyType } from '../../enums/propertyType.enum';

// clase Property
export class Property {
    id: string;
    type: PropertyType;
    location: Location;
    rooms: number;
    bathrooms: number;
    area: number;
    cost_per_night: number; // costo por noche
    max_people: number; // max gente que puede alojar
}
