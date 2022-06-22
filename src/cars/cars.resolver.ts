import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CarsService } from './cars.service';
import { CreateCarInput } from './dto/input/create-car.input';
import { CarEntity } from './car.entity';

@Resolver(() => 'Car')
export class CarsResolver {
  constructor(private readonly carsService: CarsService) {}

  @Mutation(() => CarEntity)
  async createCar(
    @Args('createCar') createCarInput: CreateCarInput,
  ): Promise<CarEntity> {
    return await this.carsService.createCar(createCarInput);
  }

  @Query(() => CarEntity, { name: 'car', nullable: true })
  async getCar(@Args('id') id: number): Promise<CarEntity> {
    return await this.carsService.getCar(id);
  }

  @Query(() => [CarEntity], { name: 'cars', nullable: 'items' })
  async getCars(): Promise<CarEntity[]> {
    return await this.carsService.getCars();
  }
}
