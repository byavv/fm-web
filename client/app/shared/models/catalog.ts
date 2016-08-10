import { IFilterModel } from "./filter";

export class Catalog {
    id: string;
    filters: Array<IFilterModel>;
    sub: string;  
}
