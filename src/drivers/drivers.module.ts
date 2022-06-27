import { Module } from '@nestjs/common';
import { DriversResolver } from './drivers.resolver';
import { DriversService } from './drivers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver])],
  providers: [DriversResolver, DriversService],
  exports: [TypeOrmModule.forFeature([Driver])],
})
export class DriversModule {}
