import { FilterPanelActions } from "./filterPanelAction";
import { QueryActions } from "./queryAction";
import { SearchActions } from "./searchAction";

export * from "./filterPanelAction";
export * from "./queryAction";
export * from "./searchAction";

export var ACTIONS_PROVIDERS: Array<any> = [
    FilterPanelActions,
    QueryActions,
    SearchActions
];