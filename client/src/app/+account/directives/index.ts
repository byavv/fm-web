import { ShowError } from './showError';
import { UiPane, UiTabs } from "./uiTabs";

export * from './showError';
export * from './uiTabs';

export var ACCOUNT_DIRECTIVES: Array<any> = [
    ShowError,
    UiPane,
    UiTabs
];