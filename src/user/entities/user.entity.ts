import { Role } from "src/enums/role.enum";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    password: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text')
    name: string;

    @Column('text')
    role: Role;

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

}
