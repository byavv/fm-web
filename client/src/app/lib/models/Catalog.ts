import { FilterInterface } from './Filter';

export class Catalog {
    id: string;
    makers: Array<any>;
    engineTypes: Array<any>;
    sub: string;
    filters: Array<FilterInterface>;
}
