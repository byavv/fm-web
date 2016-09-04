import { MasterController } from './masterController';
import { UsersBackEndApi } from "./usersBackEndApi";

export * from './masterController';
export * from './usersBackEndApi';

export var ACCOUNT_SERVICES_PROVIDERS: Array<any> = [
    MasterController,
    UsersBackEndApi
];