import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';
import { DriverInput } from './dto/input/driver.input';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  public async createDriver(driverInput: DriverInput): Promise<Driver> {
    return await this.driverRepository.save(driverInput);
  }

  public async getDriver(id: number): Promise<Driver> {
    const driver = await this.driverRepository.findOneBy({ id });
    if (!driver) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }
    return driver;
  }

  public async getDrivers(): Promise<Driver[]> {
    return await this.driverRepository.find();
  }

  public async addCarToDriver(driverId: number, carId: number): Promise<Driver> {
    const driver = await this.getDriver(driverId);
    driver.carId = carId;
    await this.driverRepository.update({ id: driverId }, driver);
    return driver;
  }

  public async deleteDriver(id: number): Promise<Driver> {
    const driver = await this.getDriver(id);
    await this.driverRepository.delete(id);
    return driver;
  }

  public async updateDriver(id: number, driverInput: DriverInput): Promise<Driver> {
    await this.driverRepository.update({ id: id }, driverInput);
    return await this.getDriver(id);
  }
}
