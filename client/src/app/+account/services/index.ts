import { MasterController } from './masterController';
import { UsersBackEndApi } from "./userBackEndApi";

export * from './masterController';
export * from './userBackEndApi';

export var ACCOUNT_SERVICES_PROVIDERS: Array<any> = [
    MasterController,
    UsersBackEndApi
];