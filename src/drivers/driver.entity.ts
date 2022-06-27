import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Car } from '../cars/car.entity';

@ObjectType('drivers')
@Entity('drivers')
export class Driver {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  age: number;

  @Field(() => Car, { nullable: true })
  @ManyToOne(() => Car, (car: Car) => car.drivers, { nullable: true })
  @JoinColumn({ name: 'carId' })
  car?: Promise<Car>;

  @Field({ nullable: true })
  @Column({ nullable: true })
  carId?: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
