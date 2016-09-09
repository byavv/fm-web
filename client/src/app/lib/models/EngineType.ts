/* tslint:disable */
import {
  Car
} from './';

export interface EngineTypeInterface {
  name: string;
  description: string;
  id?: number;
  cars?: Array<Car>;
}

export class EngineType implements EngineTypeInterface {
  name: string;
  description: string;
  id: number;
  cars: Array<Car>;
  constructor(instance?: EngineType) {
    Object.assign(this, instance);
  }
}
