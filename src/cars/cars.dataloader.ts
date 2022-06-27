import * as DataLoader from 'dataloader';
import { CarsService } from './cars.service';
import { Car } from './car.entity';

export function createCarsLoader(carsService: CarsService) {
  return new DataLoader<number, Car>(async (ids: number[]) => {
    const cars = await carsService.getCarsByIds(ids);
    const mapCars: Record<number, Car> = {};
    for (const car of cars) {
      mapCars[car.id] = car;
    }
    return ids.map((id) => mapCars[id]);
  });
}
