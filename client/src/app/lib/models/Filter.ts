export interface FilterInterface {
    id?: string;
    value?: any;
    viewValue?: string;
    active?: boolean;
}

export class FilterModel implements FilterInterface {
    id: string;
    value: any;
    viewValue: string;
    active: boolean;
    constructor(instance?: FilterInterface) {
        Object.assign(this, instance);
    }
}
