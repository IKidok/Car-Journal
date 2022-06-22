import { Injectable } from '@nestjs/common';
import { CreateCarInput } from './dto/input/create-car.input';
import { InjectRepository } from '@nestjs/typeorm';
import { CarEntity } from './car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
  ) {}

  public async createCar(createCarData: CreateCarInput): Promise<CarEntity> {
    return await this.carRepository.save({ ...createCarData });
  }

  public async getCar(id: number): Promise<CarEntity> {
    return await this.carRepository.findOneBy({ id });
  }

  public async getCars(): Promise<CarEntity[]> {
    return await this.carRepository.find();
  }

  public async deleteCar(id: number): Promise<number> {
    await this.carRepository.delete(id);
    return id;
  }

  public async updateCar(id): Promise<CarEntity> {
    await this.carRepository.update({ id: id }, { color: 'blue' });
    return await this.getCar(id);
  }
}
