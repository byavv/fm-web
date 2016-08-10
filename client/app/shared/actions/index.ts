import { FilterPanelActions } from "./filterPanelAction";
import { QueryActions } from "./queryAction";
import { VehicleActions } from "./vehicleAction";
import { CatalogActions } from "./catalogAction";

export * from "./filterPanelAction";
export * from "./queryAction";
export * from "./vehicleAction";
export * from "./catalogAction";

export var ACTIONS_PROVIDERS: Array<any> = [
    FilterPanelActions,
    QueryActions,
    VehicleActions,
    CatalogActions
];