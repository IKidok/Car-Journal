import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CarInput } from './dto/input/car.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  public async createCar(carInput: CarInput): Promise<Car> {
    return await this.carRepository.save(carInput);
  }

  public async getCar(id: number): Promise<Car> {
    const car = await this.carRepository.findOneBy({ id });
    if (!car) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }
    return car;
  }

  public async getCars(): Promise<Car[]> {
    return await this.carRepository.find();
  }

  public async deleteCar(id: number): Promise<Car> {
    const car = await this.getCar(id);
    await this.carRepository.delete(id);
    return car;
  }

  public async getCarsByIds(ids: number[]): Promise<Car[]> {
    return await this.carRepository.findByIds(ids);
  }

  public async updateCar(id: number, carInput: CarInput): Promise<Car> {
    await this.carRepository.update({ id: id }, carInput);
    return await this.getCar(id);
  }
}
