
import { PropertyType } from '../../enums/propertyType.enum';
import { PaymentMethod } from '../../enums/paymentMethod.enum';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity('Booking')
export class Booking {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid', {nullable: false})
    user_id: string; // Cambio en el tipo de datos

    @Column('date', {nullable: false})
    check_in: Date;

    @Column('date', {nullable: false})
    check_out: Date;

    @Column('text', {nullable: false})
    property_type: PropertyType;

    @Column('uuid', {nullable: false})
    property_id: string;

    @Column('numeric', {nullable: false})
    num_people: number;

    @Column('text', {nullable: false})
    payment_method: PaymentMethod; 

    @Column('boolean', {nullable: true})
    is_paid: boolean;
    
    @Column('boolean', {nullable: true})
    is_confirmed: boolean; 
}