import {Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Location')
export class Location {
    // primary key auto generada - tipo de auto gen
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        nullable: false,
    })
    country: string;

    @Column('text',{
        nullable: false,
    })
    city: string;
    
    @Column('text',{
        unique: true,
        nullable: false,
    })
    address: string;
}