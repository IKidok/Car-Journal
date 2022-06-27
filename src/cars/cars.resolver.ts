import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { CarsService } from './cars.service';
import { CarInput } from './dto/input/car.input';
import { Car } from './car.entity';

@Resolver(() => Car)
export class CarsResolver {
  constructor(private readonly carsService: CarsService) {}

  @Mutation(() => Car, { nullable: true })
  async createCar(@Args('carInput') carInput: CarInput): Promise<Car> {
    return await this.carsService.createCar(carInput);
  }

  @Query(() => Car, { name: 'car' })
  async getCar(@Args('id', { type: () => Int }) id: number): Promise<Car> {
    return await this.carsService.getCar(id);
  }

  @Query(() => [Car], { name: 'cars', nullable: 'items' })
  async getCars(): Promise<Car[]> {
    return await this.carsService.getCars();
  }

  @Mutation(() => Car)
  async updateCar(
    @Args('id', { type: () => Int }) id: number,
    @Args('carInput') carInput: CarInput,
  ): Promise<Car> {
    return await this.carsService.updateCar(id, carInput);
  }

  @Mutation(() => Car)
  async deleteCar(@Args('id', { type: () => Int }) id: number): Promise<Car> {
    return await this.carsService.deleteCar(id);
  }
}
