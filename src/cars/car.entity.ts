import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Driver } from '../drivers/driver.entity';

@ObjectType('cars')
@Entity('cars')
export class Car {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  color: string;

  @Field()
  @Column()
  issueYear: number;

  @Field(() => [Driver], { nullable: true, name: 'drivers' })
  @OneToMany(() => Driver, (driver: Driver) => driver.car, { nullable: true })
  drivers?: Promise<Driver[] | null>;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
