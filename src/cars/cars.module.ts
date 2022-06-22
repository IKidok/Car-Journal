import { Module } from '@nestjs/common';
import { CarsResolver } from './cars.resolver';
import { CarsService } from './cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity])],
  providers: [CarsResolver, CarsService],
})
export class CarsModule {}
