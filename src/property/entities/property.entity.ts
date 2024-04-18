<<<<<<< HEAD
=======
import { Location } from './location.entity';
>>>>>>> 0d0bf0c (feat (property): Add relational entities, endpoints, service and aux entities)
import { PropertyType } from '../../enums/propertyType.enum';
import { Role } from "src/enums/role.enum";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Property')
// clase Property
export class Property {
    // primary key auto generada - tipo de auto gen
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        nullable: false,   
    })
    type: string;

    // 
    @ManyToOne(() => Location)
    @JoinColumn({ name: 'id' })
    location: Location;

    @Column('number', {
        nullable: false,   
    })
    latitude: number;

    @Column('number', {
        nullable: false,   
    })
    altitude: number;
    
    @Column('number', {
        nullable: false,   
    })
    rooms: number;
    
    @Column('number', {
        nullable: false,   
    })
    bathrooms: number;
    
    @Column('number', {
        nullable: false,   
    })
    area: number;
    
    @Column('number', {
        nullable: false,   
    })
    cost_per_night: number; // costo por noche
    
    @Column('number', {
        nullable: false,   
    })
    max_people: number; // max gente que puede alojar

    // El SLUG LO QUE HACE ES "CAMUFLAR" U OCULTAR METADATOS DE LOS DATOS COMO POR EJEMPLO EL ID EN LA URL !!!!
    // ARMAMOS UNA EQUIVALENCIA, UN MAPEO CON EL SLUG (palabra o palabras camufladas) CON EL ENDPOINT REAL
    @Column('text', 
            {unique: true})
    slug: string; 

    // before insert hacemos un refactor
    // al slug
    @BeforeInsert()
    checkSlug(): void {
        if (!this.slug) {
<<<<<<< HEAD
            this.slug = `${this.country}-${this.city}-${this.address}`;
=======
            this.slug = `${this.location.country}-${this.location.city}-${this.location.address}`;
>>>>>>> 0d0bf0c (feat (property): Add relational entities, endpoints, service and aux entities)
        }

        this.slug = this.slug.toLowerCase();
    }
}
