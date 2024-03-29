import { Location } from '../../aux_entities/location.entity';

// clase Property
export class Property {
    id: string;
    name: string;
    location: Location;
    rooms: number;
    bathrooms: number;
    area: number;
    cost_per_night: number; // costo por noche
    max_people: number; // max gente que puede alojar
}
