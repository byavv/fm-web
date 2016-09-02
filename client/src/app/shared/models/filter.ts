export interface IFilterModel {
    id?: string;
    value?: any;
    viewValue?: string;
    active?: boolean;    
}

export class FilterModel {
    id: string;
    value: any;
    viewValue: string;
    active: boolean;
    constructor() { }
}
