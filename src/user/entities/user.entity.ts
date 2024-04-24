import { Role } from "../../enums/role.enum";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('Users')
export class User {
    [x: string]: any;

    @PrimaryGeneratedColumn('uuid')
    id: string ;

    @Column('text', { nullable: false })
    password: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text', { nullable: false })
    name: string;

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

}


