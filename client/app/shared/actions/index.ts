import { FilterPanelActions } from "./filterPanelAction";
import { QueryActions } from "./queryAction";
import { VehicleActions } from "./vehicleAction";

export * from "./filterPanelAction";
export * from "./queryAction";
export * from "./vehicleAction";

export var ACTIONS_PROVIDERS: Array<any> = [
    FilterPanelActions,
    QueryActions,
    VehicleActions    
];