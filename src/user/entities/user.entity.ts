import { Role } from "../../enums/role.enum";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn, ValueTransformer } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AccountEntity } from "./account.entity";
import { Property } from "src/property/entities/property.entity";
import { Booking } from "src/booking/entities/booking.entity";


const transformer: Record<"date" | "bigint", ValueTransformer> = {
    date: {
      from: (date: string | null) => date && new Date(parseInt(date, 10)),
      to: (date?: Date) => date?.valueOf().toString(),
    },
    bigint: {
      from: (bigInt: string | null) => bigInt && parseInt(bigInt, 10),
      to: (bigInt?: number) => bigInt?.toString(),
    },
  }



@Entity({ name: "Users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string
 
  // Define la relación con Property
  @OneToMany(() => Property, property => property.user_id) // Indica que User puede tener muchas Property
  properties: Property;

  // Define la relación con Booking
  @OneToMany(() => Booking, booking => booking.user_id) // Indica que User puede tener muchas Booking
  bookings: Booking;

  @Column({ type: "varchar", nullable: true })
  name!: string | null
 
  @Column({ type: "varchar", nullable: true, unique: true })
  email!: string | null
 
  @Column({ type: "varchar", nullable: true, transformer: transformer.date })
  emailVerified!: string | null
    
  @Column({ type: "varchar", nullable: true })
  password!: string | null

  @Column({ type: "varchar", nullable: true })
  image!: string | null
 
  @Column({ type: "varchar", nullable: true })
  role!: Role | null
 
  @OneToMany(() => AccountEntity, (account) => account.userId)
  accounts!: AccountEntity[]

  @BeforeInsert()
  checkFieldsBeforeInsert() {
      this.email = this.email.toLowerCase().trim();
  }
}


