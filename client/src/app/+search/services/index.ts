import { FilterController } from './filterController';
import { TotalCounter } from "./totalCounter";
import { TrackerApi } from "./trackerApi";

export * from './filterController';
export * from './totalCounter';
export * from './trackerApi';

export var SEARCH_SERVICES_PROVIDERS: Array<any> = [
    FilterController,  
    TotalCounter,
    TrackerApi    
];