/* tslint:disable */

export interface ProfileInterface {
  name?: string;
  location?: string;
  userId: number;
  id?: number;
}

export class Profile implements ProfileInterface {
  name: string;
  location: string;
  userId: number;
  id: number;
  constructor(instance?: Profile) {
    Object.assign(this, instance);
  }
}
