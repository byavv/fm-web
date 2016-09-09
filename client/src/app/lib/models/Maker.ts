/* tslint:disable */

export interface MakerInterface {
  name: string;
  id?: number;
  carModels?: Array<any>;
}

export class Maker implements MakerInterface {
  name: string;
  id: number;
  carModels: Array<any>;
  constructor(instance?: Maker) {
    Object.assign(this, instance);
  }
}
