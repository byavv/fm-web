export interface VehicleInterface {
    description?: string;
    milage?: number;
    color?: string;
    price?: number;
    year?: number;
    engineType: string;
    gear?: string;
    makerName?: string;
    modelName?: string;
    options?: string;
    images?: Array<any>;
    userId?: string;
    id?: number;
    makerId?: number;
    carModelId?: number;
    engineTypeId?: number;
    carModel?: any;
    carType?: any;
    carOptions?: Array<any>;
}


export class Vehicle implements VehicleInterface {
    images = [];
    description = "";
    price: number;
    makerName: string = "";
    modelName: string = "";
    milage: number;
    color = "";
    engineType = "";
    year?: number;
    gear?: string;
    options?: string;
    userId?: string;
    id?: number;
    makerId?: number;
    carModelId?: number;
    engineTypeId?: number;
    carModel?: any;
    carType?: any;
    carOptions?: Array<any>;
    constructor(instance?: Vehicle) {
        Object.assign(this, instance);
    }
}
