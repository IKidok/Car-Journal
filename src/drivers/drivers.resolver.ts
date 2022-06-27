import {
  Resolver,
  Query,
  Args,
  Mutation,
  Int,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { DriversService } from './drivers.service';
import { Driver } from './driver.entity';
import { DriverInput } from './dto/input/driver.input';
import { Car } from '../cars/car.entity';
import DataLoader from 'dataloader';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(() => Driver)
export class DriversResolver {
  constructor(private readonly driversService: DriversService) {}

  @Mutation(() => Driver)
  async createDriver(@Args('driverInput') driverInput: DriverInput): Promise<Driver> {
    return await this.driversService.createDriver(driverInput);
  }

  @Query(() => Driver, { name: 'driver' })
  async getDriver(@Args('id', { type: () => Int }) id: number): Promise<Driver> {
    const driver = await this.driversService.getDriver(id);
    if (!driver) {
      throw new HttpException('Driver not found', HttpStatus.NOT_FOUND);
    }
    return driver;
  }

  @Query(() => [Driver], { name: 'drivers', nullable: 'items' })
  async getDrivers(): Promise<Driver[]> {
    return await this.driversService.getDrivers();
  }

  @Mutation(() => Driver)
  async updateDrivers(
    @Args('id', { type: () => Int }) id: number,
    @Args('driverInput') driverInput: DriverInput,
  ): Promise<Driver> {
    try {
      return await this.driversService.updateDriver(id, driverInput);
    } catch (e) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }
  }

  @Mutation(() => Driver)
  async addCarToDriver(
    @Args('driverId', { type: () => Int }) driverId: number,
    @Args('carId', { type: () => Int }) carId: number,
  ): Promise<Driver> {
    return await this.driversService.addCarToDriver(driverId, carId);
  }

  @Mutation(() => Driver)
  async deleteCar(@Args('id', { type: () => Int }) id: number): Promise<Driver> {
    return await this.driversService.deleteDriver(id);
  }

  @ResolveField('car', () => Car, { nullable: true })
  async getCar(
    @Parent() driver: Driver,
    @Context('carsLoader') carsLoader: DataLoader<number, Car>,
  ) {
    const { carId } = driver;
    if (carId) {
      return carsLoader.load(carId);
    }
  }
}
